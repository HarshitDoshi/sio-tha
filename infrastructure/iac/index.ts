import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

const config = new pulumi.Config();
const minClusterSize = config.getNumber("minClusterSize") || 3;
const maxClusterSize = config.getNumber("maxClusterSize") || 6;
const desiredClusterSize = config.getNumber("desiredClusterSize") || 3;
const eksNodeInstanceType = config.get("eksNodeInstanceType") || "t3.medium";
const vpcNetworkCidr = config.get("vpcNetworkCidr") || "10.0.0.0/16";

const eksVpc = new awsx.ec2.Vpc("eks-vpc", {
    enableDnsHostnames: true,
    cidrBlock: vpcNetworkCidr,
});

const eksNodeGroupRole = new aws.iam.Role("eks-node-group-role", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
        Service: "ec2.amazonaws.com",
    }),
});

new aws.iam.RolePolicyAttachment("eks-worker-node-AmazonEKSWorkerNodePolicy", {
    role: eksNodeGroupRole.name,
    policyArn: "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
});

new aws.iam.RolePolicyAttachment("eks-worker-node-AmazonEC2ContainerRegistryReadOnly", {
    role: eksNodeGroupRole.name,
    policyArn: "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
});

new aws.iam.RolePolicyAttachment("eks-worker-node-AmazonEKS_CNI_Policy", {
    role: eksNodeGroupRole.name,
    policyArn: "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",
});

const eksInstanceProfile = new aws.iam.InstanceProfile("eks-instance-profile", {
    role: eksNodeGroupRole.name,
});

const eksCluster = new eks.Cluster("eks-cluster", {
    vpcId: eksVpc.vpcId,
    publicSubnetIds: eksVpc.publicSubnetIds,
    privateSubnetIds: eksVpc.privateSubnetIds,
    skipDefaultNodeGroup: true,
    endpointPrivateAccess: false,
    endpointPublicAccess: true,
});

const userData = `MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="==BOUNDARY=="

--==BOUNDARY==
Content-Type: text/x-shellscript; charset="us-ascii"

#!/bin/bash
/etc/eks/bootstrap.sh "eks-cluster"

--==BOUNDARY==--`;

const launchTemplate = new aws.ec2.LaunchTemplate("eks-launch-template", {
    namePrefix: "eks-launch-template",
    instanceType: eksNodeInstanceType,
    keyName: "sio-tha",
    userData: Buffer.from(userData).toString('base64'),
});

const nodeGroup = new aws.eks.NodeGroup("eks-node-group", {
    clusterName: eksCluster.eksCluster.name,
    nodeRoleArn: eksNodeGroupRole.arn,
    subnetIds: eksVpc.privateSubnetIds,
    scalingConfig: {
        desiredSize: desiredClusterSize,
        maxSize: maxClusterSize,
        minSize: minClusterSize,
    },
    launchTemplate: {
        id: launchTemplate.id,
        version: launchTemplate.latestVersion.apply(version => version.toString()),
    },
});

export const kubeconfig = eksCluster.kubeconfig;
export const vpcId = eksVpc.vpcId;
