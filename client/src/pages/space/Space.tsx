import { useParams } from "react-router-dom";
import { SpaceContainer } from "../../components";

const Space = () => {
  const { spaceId } = useParams<{ spaceId: string }>();

  return <SpaceContainer spaceId={spaceId || ""} />;
};

export default Space;