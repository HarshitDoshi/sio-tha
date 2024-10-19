import { useEffect } from "react";
import { SpaceComponent } from ".";
import useSpaceState from "./Space.state";
import { ISpaceContainer } from "./types";
import { Loader, Error } from "../common";

const SpaceContainer = ({ spaceId }: ISpaceContainer) => {
  const spaceState = useSpaceState({ spaceId: spaceId || "" });

  useEffect(() => {
    if (spaceId) localStorage.setItem("whoa!llet-space", spaceId);
    if (spaceState.transactionsError) localStorage.removeItem("whoa!llet-space");
  }, [spaceState.transactionsError, spaceId]);

  useEffect(() => {
    if (spaceState.copySpaceIdLog) {
      const timer = setTimeout(() => {
        spaceState.setCopySpaceIdLog(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [spaceState, spaceState.copySpaceIdLog, spaceState.setCopySpaceIdLog]);

  if (spaceState.isTransactionsLoading) return <Loader />;

  if (spaceState.transactionsError) return <Error handlerError={spaceState.handleForgetSpace} handleErrorLabel={'Go Home'} />;

  return <SpaceComponent spaceId={spaceId} state={spaceState} />;
};

export default SpaceContainer;