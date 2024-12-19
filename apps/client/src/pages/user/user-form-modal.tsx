import { Box, Button, CircularProgress } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import {
  CustomDatePicker,
  CustomInput,
  CustomModal,
  CustomSelect,
} from "src/components/ui";
import {
  CreateUserInput,
  defaultCreateUserFields,
  useCreateUser,
} from "./api/create-user";
import { UpdateUserInput, useUpdateUser } from "./api/update-user";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: UseFormReturn<CreateUserInput | UpdateUserInput>;
  isEditMode: boolean;
}

export const UserFormModal: React.FC<Props> = ({
  open,
  onClose,
  methods,
  isEditMode,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = methods;

  const { mutate: createUser, isPending } = useCreateUser();
  const { mutate: updateUser, isPending: updatePending } = useUpdateUser();

  const handleClose = () => {
    reset(defaultCreateUserFields);
    onClose();
  };

  const submitHandler = (data: CreateUserInput | UpdateUserInput) => {
    if (isEditMode) {
      updateUser(data as UpdateUserInput, {
        onSuccess: () => {
          handleClose();
        },
      });
      return;
    }
    createUser(data as CreateUserInput, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <CustomModal
      modalTitle={isEditMode ? "Edit User" : "Add User"}
      open={open}
      handleClose={handleClose}
      footer={
        <>
          <Button type="submit" variant="contained" form="user-form">
            {isPending || updatePending ? (
              <CircularProgress color="inherit" size={24} />
            ) : isEditMode ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
          <Button
            type="button"
            color="error"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </>
      }
    >
      <Box
        component={"form"}
        sx={{ ".form-container + .form-container": { mt: "10px" } }}
        onSubmit={handleSubmit(submitHandler)}
        id="user-form"
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

        {isEditMode ? null : (
          <>
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
          </>
        )}

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
            required
          />
        </Box>
      </Box>
    </CustomModal>
  );
};
