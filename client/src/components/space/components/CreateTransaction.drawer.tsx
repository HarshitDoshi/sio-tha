import { Drawer } from "@mui/material";
import { ICreateTransactionDrawer } from "../types";
import { CreateTransaction } from "../..";

const CreateTransactionDrawer = ({ spaceId, openCreateTransaction, toggleCreateTransactionDrawer }: ICreateTransactionDrawer) => {
  return (
    <Drawer
      anchor={'right'}
      open={openCreateTransaction}
      onClose={toggleCreateTransactionDrawer(false)}
    >
      <CreateTransaction
        spaceId={spaceId || ""}
        toggleCreateTransactionDrawer={toggleCreateTransactionDrawer}
      />
    </Drawer>
  );
};

export default CreateTransactionDrawer;