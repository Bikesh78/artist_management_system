import { Box, FormHelperText, InputLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, Controller, FieldError } from "react-hook-form";
import dayjs from "dayjs";

interface Props {
  name: string;
  control: Control<any>;
  type?: "number" | "string" | "password" | "tel";
  error: FieldError | undefined;
  label?: string;
  title?: string;
  disabled?: boolean;
  required?: boolean;
  classnames?: string;
  disablePast?: boolean;
  format?: string;
}

export const CustomDatePicker: React.FC<Props> = ({
  label,
  name,
  control,
  error,
  classnames = "",
  disablePast,
  disabled,
  format,
  required,
}) => {
  return (
    <Box className={`${classnames} datepicker`}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            {label && (
              <Box sx={{ display: "flex", columnGap: "0.1rem", mb: "3px" }}>
                <InputLabel htmlFor={name} sx={{ marginBottom: "3px" }}>
                  {label}
                </InputLabel>
                <InputLabel style={{ color: "red" }}>
                  {required && " *"}
                </InputLabel>
              </Box>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => {
                  field.onChange(
                    format ? date?.format(format) : date?.format("MM-DD-YYYY"),
                  );
                }}
                disablePast={disablePast ? true : false}
                disabled={disabled}
                sx={{ ".MuiInputAdornment-root": { height: "12px" } }}
              />
            </LocalizationProvider>
          </>
        )}
      ></Controller>

      {error?.message && (
        <FormHelperText
          error={true}
          sx={{ color: "red !important", fontSize: "10px", marginTop: "5px" }}
        >
          {error?.message}
        </FormHelperText>
      )}
    </Box>
  );
};
