import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IAmountField } from "../types";

const AmountField = ({ formControl, formErrors }: IAmountField) => {
  return (
    <Controller
      name="amount"
      control={formControl}
      defaultValue={0.00}
      render={({ field }) => (
        <TextField
          {...field}
          id="transaction-amount"
          fullWidth
          label={'Amount'}
          variant={'outlined'}
          size={'medium'}
          type={'number'}
          error={!!formErrors.amount}
          helperText={formErrors.amount ? formErrors.amount.message : null}
        />
      )}
    />
  );
};

export default AmountField;