import { Container } from "@mui/material";
import { CreateTransactionDrawer, VisualizeTransactionsDrawer, ConfirmForgetSpaceDialog, TransactionsTable, SpaceActions } from "../../components";
import { ISpaceComponent } from "./types";

const SpaceComponent = ({ spaceId, state }: ISpaceComponent) => {
  const {
    transactions,
    openCreateTransaction,
    openVisualizeTransactions,
    openConfirmForgetSpaceDialog,
    copySpaceIdLog,
    toggleCreateTransactionDrawer,
    toggleVisualizeTransactionsDrawer,
    handleForgetSpaceDialogOpen,
    handleForgetSpaceDialogClose,
    handleForgetSpace,
    handleCopySpaceId,
  } = state;
  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: 1,
        paddingY: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SpaceActions
        copySpaceIdLog={copySpaceIdLog}
        toggleCreateTransactionDrawer={toggleCreateTransactionDrawer}
        toggleVisualizeTransactionsDrawer={toggleVisualizeTransactionsDrawer}
        handleCopySpaceId={handleCopySpaceId}
        handleForgetSpaceDialogOpen={handleForgetSpaceDialogOpen}
        openConfirmForgetSpaceDialog={openConfirmForgetSpaceDialog}
      />
      <CreateTransactionDrawer
        spaceId={spaceId || ""}
        openCreateTransaction={openCreateTransaction}
        toggleCreateTransactionDrawer={toggleCreateTransactionDrawer}
      />
      <VisualizeTransactionsDrawer
        spaceId={spaceId || ""}
        openVisualizeTransactions={openVisualizeTransactions}
        toggleVisualizeTransactionsDrawer={toggleVisualizeTransactionsDrawer}
      />
      <TransactionsTable transactions={transactions} />
      <ConfirmForgetSpaceDialog
        copySpaceIdLog={copySpaceIdLog}
        openConfirmForgetSpaceDialog={openConfirmForgetSpaceDialog}
        handleForgetSpaceDialogClose={handleForgetSpaceDialogClose}
        handleForgetSpace={handleForgetSpace}
        handleCopySpaceId={handleCopySpaceId}
      />
    </Container>
  );
};

export default SpaceComponent;