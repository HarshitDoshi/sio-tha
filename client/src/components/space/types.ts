import { ISpace, ITransaction, ITypeWithSpaceId } from "../../utilities/types";
import useSpaceState from "./Space.state";

type IUseSpaceState = ITypeWithSpaceId;

type ICreateTransactionDrawer = {
  openCreateTransaction: boolean;
  toggleCreateTransactionDrawer: (newOpen: boolean) => () => void;
} & ITypeWithSpaceId;

type IVisualizeTransactionsDrawer = {
  openVisualizeTransactions: boolean;
  toggleVisualizeTransactionsDrawer: (newOpen: boolean) => () => void;
} & ITypeWithSpaceId;

type IConfirmForgetSpaceDialog = {
  openConfirmForgetSpaceDialog: boolean;
  handleForgetSpaceDialogClose: () => void;
  copySpaceIdLog: {
    type: "success" | "failure";
    message: string;
  } | null;
  handleCopySpaceId: () => void;
  handleForgetSpace: () => void;
};

type ITransactionsTable = {
  spaceId: ISpace['id'];
  transactions: ITransaction[] | undefined;
};

type ISpaceActions = {
  copySpaceIdLog: {
    type: "success" | "failure";
    message: string;
  } | null;
  handleCopySpaceId: () => void;
  handleForgetSpaceDialogOpen: () => void;
  openConfirmForgetSpaceDialog: boolean;
  toggleCreateTransactionDrawer: (newOpen: boolean) => () => void;
  toggleVisualizeTransactionsDrawer: (newOpen: boolean) => () => void;
};

type ISpaceContainer = ITypeWithSpaceId;

type ISpaceComponent = {
  state: ReturnType<typeof useSpaceState>;
} & ITypeWithSpaceId;

export type { IUseSpaceState, ISpaceContainer, ISpaceComponent, ICreateTransactionDrawer, IVisualizeTransactionsDrawer, IConfirmForgetSpaceDialog, ITransactionsTable, ISpaceActions };