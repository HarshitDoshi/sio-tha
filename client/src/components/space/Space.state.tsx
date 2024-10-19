import { useNavigate } from "react-router-dom";
import { IUseSpaceState } from "./types";
import { useTransactions } from "../../utilities/services";
import { useState } from "react";

const useSpaceState = ({ spaceId }: IUseSpaceState) => {
  const navigate = useNavigate();

  const { data: transactions, isLoading: isTransactionsLoading, error: transactionsError } = useTransactions({ spaceId: spaceId || '' });

  const [openCreateTransaction, setOpenCreateTransaction] = useState(false);
  const [openVisualizeTransactions, setOpenVisualizeTransactions] = useState(false);
  const [openConfirmForgetSpaceDialog, setOpenConfirmForgetSpaceDialog] = useState(false);
  const [copySpaceIdLog, setCopySpaceIdLog] = useState<{
    type: 'success' | 'failure',
    message: string,
  } | null>(null);

  const toggleCreateTransactionDrawer = (newOpen: boolean) => () => {
    console.log('toggleCreateTransactionDrawer', newOpen);
    setOpenCreateTransaction(newOpen);
  };

  const toggleVisualizeTransactionsDrawer = (newOpen: boolean) => () => {
    setOpenVisualizeTransactions(newOpen);
  }

  const handleForgetSpaceDialogOpen = () => {
    setOpenConfirmForgetSpaceDialog(true);
  };

  const handleForgetSpaceDialogClose = () => {
    setCopySpaceIdLog(null);
    setOpenConfirmForgetSpaceDialog(false);
  };

  const handleForgetSpace = () => {
    localStorage.removeItem("whoa!llet-space");
    handleForgetSpaceDialogClose();
    navigate("/");
  };

  const handleCopySpaceId = () => {
    navigator.clipboard.writeText(spaceId as string)
      .then(() => {
        setCopySpaceIdLog({
          type: 'success',
          message: 'Space code copied to clipboard!',
        });
      })
      .catch(() => {
        setCopySpaceIdLog({
          type: 'failure',
          message: 'Failed to copy space code to clipboard!',
        });
      });
  };

  return {
    navigate,
    transactions,
    isTransactionsLoading,
    transactionsError,
    openCreateTransaction,
    openVisualizeTransactions,
    openConfirmForgetSpaceDialog,
    copySpaceIdLog,
    setCopySpaceIdLog,
    toggleCreateTransactionDrawer,
    toggleVisualizeTransactionsDrawer,
    handleForgetSpaceDialogOpen,
    handleForgetSpaceDialogClose,
    handleForgetSpace,
    handleCopySpaceId,
  };
};

export default useSpaceState;