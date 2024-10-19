import { Autocomplete, Avatar, Chip, createFilterOptions, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { ITypeField } from "../types";
import { ITransactionType } from "../../../utilities/types";

const TypeField = ({ formControl, transactionTypes, createTransactionTypeMutation }: ITypeField) => {
  const filter = createFilterOptions<ITransactionType>();
  return (
    <Controller
      name="type"
      control={formControl}
      defaultValue={null as unknown as string}
      render={({ field }) => (
        <Autocomplete
          {...field}
          id="transaction-type"
          fullWidth
          size={'medium'}
          disablePortal
          options={transactionTypes || []}
          sx={{ width: "100%" }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          freeSolo
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : (option as ITransactionType).value
          }
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={transactionTypes?.find((transactionType) => transactionType.id === field.value) || null}
          onChange={(event, newValue) => {
            if (newValue && typeof newValue === 'object' && (newValue as ITransactionType).value) {
              if (!transactionTypes?.includes(newValue as ITransactionType)) {
                createTransactionTypeMutation.mutate(
                  {
                    value: (newValue as ITransactionType).value,
                  },
                  {
                    onSuccess: (data) => {
                      field.onChange(data.id);
                    },
                  }
                );
              } else {
                field.onChange((newValue as ITransactionType).id);
              }
            } else {
              field.onChange(newValue ? (newValue as ITransactionType).id : "");
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option.value);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                value: inputValue,
                id: inputValue,
                created_datetime: new Date().toISOString(),
                updated_datetime: new Date().toISOString(),
              });
            }
            return filtered;
          }}
          renderOption={(props, option) => {
            const { key, ...properties } = props;
            return (
              <li key={key} {...properties}>
                <Chip
                  avatar={<Avatar>{option.value.charAt(0)}</Avatar>}
                  label={option.value}
                />
              </li>
            )
          }}
          renderInput={(params) => <TextField {...params} label="Transaction Type" />}
        />
      )}
    />
  );
};

export default TypeField;