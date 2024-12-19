import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomDatePicker, CustomInput, CustomModal, CustomSelect } from "src/components/ui"
import { CreateUserInput, createUserSchema, defaultCreateUserFields } from "./api/create-user";

interface Props {
  open: boolean;
  handleClose: () => void
}

export const UserFormModal: React.FC<Props> = ({ open, handleClose }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserInput>({
    mode: "onBlur",
    defaultValues: defaultCreateUserFields,
    resolver: zodResolver(createUserSchema),
  });

  const submitHandler = (data: CreateUserInput) => {
    console.log('data', data)
  }

  return (
    <CustomModal
      modalTitle="Add user"
      open={open}
      handleClose={handleClose}
      footer={(
        <>
          <Button onClick={handleClose}>
            Add
          </Button>
        </>
      )}
    >
      <Box component={"form"}
        sx={{ ".form-container + .form-container": { mt: "10px" } }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Box
          className="form-container"
          sx={{
            display: "flex",
            gap: "8px",
            ".custom-input": { flexGrow: 1 },
          }}
        >
          <CustomInput
            name="first_name"
            title="First Name"
            placeholder="Firt Name"
            control={control}
            error={errors.first_name}
            required
          />

          <CustomInput
            name="last_name"
            title="Last Name"
            placeholder="Last Name"
            control={control}
            error={errors.last_name}
            required
          />
        </Box>

        <Box className="form-container">
          <CustomInput
            name="email"
            title="Email"
            placeholder="Email"
            control={control}
            error={errors.email}
            required
          />
        </Box>

        <Box className="form-container">
          <CustomInput
            name="password"
            title="Password"
            placeholder="Password"
            type="password"
            control={control}
            error={errors.password}
            required
          />
        </Box>

        <Box className="form-container">
          <CustomInput
            name="confirm_password"
            title="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            control={control}
            error={errors.confirm_password}
            required
          />
        </Box>

        <Box className="form-container">
          <CustomInput
            name="phone"
            title="Phone"
            placeholder="Phone"
            type="tel"
            control={control}
            error={errors.phone}
            required
          />
        </Box>

        <Box className="form-container">
          <CustomInput
            name="address"
            title="Address"
            placeholder="Address"
            control={control}
            error={errors.address}
            required
          />
        </Box>

        <Box
          className="form-container"
          sx={{
            display: "flex",
            gap: "8px",
            ".custom-select": { flexGrow: 1 },
          }}
        >
          <CustomSelect
            name="gender"
            title="Gender"
            data={[
              { value: "m", label: "Male" },
              { value: "f", label: "Female" },
              { value: "o", label: "Other" },
            ]}
            control={control}
            error={errors.gender}
            hideLegend
            required
          />

          <CustomDatePicker
            control={control}
            name={"dob"}
            label={"Date of Birth"}
            error={errors?.dob}
            format="YYYY-MM-DD"
          />
        </Box>
      </Box>
    </CustomModal>
  )
}
