import { Box } from "@mui/material";
import { CreateFooter, AmountField, TypeField, OccurredDateTimeField } from ".";
import { ICreateForm } from "./types";
import { SubmitHandler } from "react-hook-form";
import { ITransactionRequest } from "../../utilities/types";

const CreateForm = ({ spaceId, formControl, formErrors, formHandleSubmit, transactionTypes, createTransactionTypeMutation, createTransactionMutation, toggleCreateTransactionDrawer }: ICreateForm) => {
  const onSubmit: SubmitHandler<ITransactionRequest> = data => {
    createTransactionMutation.mutate({
      type: data.type,
      amount: data.amount,
      occurred_datetime: data.occurred_datetime,
    });
  };
  return (
    <Box
      component={'form'}
      onSubmit={() => {
        formHandleSubmit(onSubmit);
        toggleCreateTransactionDrawer(false);
      }}
      style={{
        minWidth: '100%',
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
        gap: '1rem',
      }}
    >
      <Box
        sx={{
          minWidth: '100%',
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <AmountField formControl={formControl} formErrors={formErrors} />
        <TypeField
          formControl={formControl}
          formErrors={formErrors}
          transactionTypes={transactionTypes}
          createTransactionTypeMutation={createTransactionTypeMutation}
        />
        <OccurredDateTimeField
          formControl={formControl}
          formErrors={formErrors}
        />
      </Box>
      <CreateFooter spaceId={spaceId} />
    </Box>
  );
};

export default CreateForm;