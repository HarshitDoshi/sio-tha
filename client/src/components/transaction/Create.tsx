import { Box } from "@mui/material";
import { ISpace } from "../../utilities/types";
import { useCreateTransactionState, CreateHeader } from ".";
import CreateForm from "./Create.form";

const CreateTransaction = ({ spaceId, toggleCreateTransactionDrawer }: { spaceId: ISpace['id'], toggleCreateTransactionDrawer: (newOpen: boolean) => () => void }) => {
  const {
    createTransactionTypeMutation,
    createTransactionMutation,
    transactionTypes,
    isTransactionsLoading,
    isTransactionTypesLoading,
    formHandleSubmit,
    formControl,
    formErrors,
  } = useCreateTransactionState({
    spaceId: spaceId,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: '100%',
        minWidth: '100%',
        width: '100%',
        maxWidth: '100%',
        paddingX: '1rem',
        paddingY: '1rem',
        gap: '1rem',
      }}
    >
      <CreateHeader />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%',
          flexGrow: 1,
        }}
      >
        {
          (!isTransactionTypesLoading && !isTransactionsLoading) && (
            <CreateForm
              spaceId={spaceId}
              formControl={formControl}
              formErrors={formErrors}
              formHandleSubmit={formHandleSubmit}
              transactionTypes={transactionTypes}
              createTransactionTypeMutation={createTransactionTypeMutation}
              createTransactionMutation={createTransactionMutation}
              toggleCreateTransactionDrawer={toggleCreateTransactionDrawer}
            />
          )
        }
      </Box>
    </Box>
  );
};

export default CreateTransaction;