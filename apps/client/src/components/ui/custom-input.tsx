import { Box, InputLabel, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";

interface InputProps {
  name: string;
  control: Control<any>;
  type?: "number" | "string" | "password";
  error: FieldError | undefined;
  placeholder?: string;
  label?: string;
  title?: string;
  disabled?: boolean;
  required?: boolean;
}

export const CustomInput: React.FC<InputProps> = ({
  name,
  control,
  type,
  error,
  placeholder = "",
  label = "",
  title = "",
  disabled = false,
  required,
  ...props
}) => {
  return (
    <>
      <div className="custom-input">
        {title && (
          <Box sx={{ display: "flex", columnGap: "0.1rem", mb: "3px" }}>
            <InputLabel className="title">{title} </InputLabel>
            <InputLabel style={{ color: "red" }}>{required && " *"}</InputLabel>
          </Box>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id={name}
              type={type}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder={placeholder}
              label={label}
              variant="outlined"
              title={title}
              disabled={disabled}
              sx={{ "& input": { padding: "7px 10px" } }}
              {...props}
            />
          )}
        />
        {error && (
          <Box sx={{ color: "red", fontSize: "10px", marginTop: "5px" }}>
            {error.message}
          </Box>
        )}
      </div>
    </>
  );
};
