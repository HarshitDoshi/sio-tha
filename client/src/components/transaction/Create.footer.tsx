import { Box, Button } from "@mui/material";
import { ICreateFooter } from "./types";
import { useCreateTransactionState } from ".";
import { useEffect, useState } from "react";

const CreateFooter = ({ spaceId }: ICreateFooter) => {
  const {
    createTransactionMutation,
    formWatch,
    // selectedTransactionType,
    // enteredTransactionAmount,
    // selectedTransactionOccurredDatetime,
  } = useCreateTransactionState({
    spaceId: spaceId,
  });
  const [typeValue, setTypeValue] = useState<string | undefined>(undefined);
  const [amountValue, setAmountValue] = useState<number | undefined>(undefined);
  const [occurredDatetimeValue, setOccurredDatetimeValue] = useState<Date | undefined>(undefined);
  useEffect(() => {
    setTypeValue(formWatch('type'));
    setAmountValue(formWatch('amount'));
    setOccurredDatetimeValue(formWatch('occurred_datetime'));
  }, [amountValue, formWatch, occurredDatetimeValue, typeValue]);
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Button
        fullWidth
        variant={'contained'}
        disabled={
          createTransactionMutation.isPending
          // || !typeValue
          // || !amountValue
          // || !occurredDatetimeValue
        }
        size={'large'}
        type={'submit'}
      >
        {
          createTransactionMutation.isPending
            ? 'Creating transaction...'
            : 'Create Transaction'
        }
      </Button>
    </Box>
  );
};

export default CreateFooter;