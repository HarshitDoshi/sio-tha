import { Controller } from "react-hook-form";
import { IOccurredDatetimeField } from "../types";
import { DatePicker } from "@mui/x-date-pickers";

const OccurredDateTimeField = ({ formControl }: IOccurredDatetimeField) => {
  return (
    <Controller
      name="occurred_datetime"
      control={formControl}
      defaultValue={new Date()}
      render={({ field }) => (
        <DatePicker
          {...field}
          label={'Occurred DateTime'}
          sx={{ width: "100%" }}
          displayWeekNumber
          closeOnSelect
          disableFuture
        />
      )}
    />
  );
};

export default OccurredDateTimeField;