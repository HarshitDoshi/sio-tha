import { Drawer } from "@mui/material";
import { IVisualizeTransactionsDrawer } from "../types";
import { VisualizeTransactions } from "../../transaction";

const VisualizeTransactionsDrawer = ({ spaceId, openVisualizeTransactions, toggleVisualizeTransactionsDrawer }: IVisualizeTransactionsDrawer) => {
  return (
    <Drawer
      anchor={'bottom'}
      open={openVisualizeTransactions}
      onClose={toggleVisualizeTransactionsDrawer(false)}
      PaperProps={{
        sx: {
          minHeight: '50%',
        },
      }}
    >
      <VisualizeTransactions spaceId={spaceId || ""} />
    </Drawer>
  );
};

export default VisualizeTransactionsDrawer;