# Staple.IO Take-Home Assignment by Harshit Doshi

```
docker buildx build --file Containerfile --tag siowebclient --platform=linux/amd64 .
docker tag siowebclient ghcr.io/harshitdoshi/sio-tha/siowebclient:siowebclient
docker push ghcr.io/harshitdoshi/sio-tha/siowebclient:siowebclient

docker buildx build --file Containerfile --tag siowebserver --platform=linux/amd64 .
docker tag siowebserver ghcr.io/harshitdoshi/sio-tha/siowebserver:siowebserver
docker push ghcr.io/harshitdoshi/sio-tha/siowebserver:siowebserver
```
