import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";

interface SelectData {
  value: string;
  label: string;
}

interface Props {
  name: string;
  control: Control<any>;
  error: FieldError | undefined;
  data: SelectData[];
  defaultValue?: string | number;
  hideLegend?: boolean;
  required?: boolean;
  title: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<Props> = ({
  name,
  control,
  error,
  data = [],
  defaultValue,
  title = "",
  disabled = false,
  hideLegend,
  required,
}) => {
  return (
    <>
      <Box
        className={`custom-select`}
        sx={{
          "& legend": {
            display: hideLegend ? "none" : "initial",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            top: hideLegend ? 0 : "-5px",
          },
        }}
      >
        {title && (
          <Box sx={{ display: "flex", columnGap: "0.1rem", mb: "3px" }}>
            <InputLabel className="title">{title} </InputLabel>
            {required && (
              <InputLabel style={{ color: "red" }}>{" *"}</InputLabel>
            )}
          </Box>
        )}

        <FormControl variant="outlined" sx={{width:"100%"}}>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  label={name}
                  onChange={onChange}
                  value={value}
                  disabled={disabled}
                  fullWidth
                  defaultValue={defaultValue || ""}
                  // sx={{ width: "200px" }}
                >
                  {data?.length ? (
                    data?.map((item, index) => {
                      const value = item?.value;
                      const label = item?.label;
                      return (
                        <MenuItem key={index} value={value}>
                          {label}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value={""} disabled>
                      No options
                    </MenuItem>
                  )}
                </Select>
              );
            }}
          />
        </FormControl>
        {error && (
          <Box sx={{ color: "red", fontSize: "10px", marginTop: "5px" }}>
            {error.message}
          </Box>
        )}
      </Box>
    </>
  );
};
