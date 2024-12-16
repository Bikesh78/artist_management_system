import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomDatePicker, CustomInput, CustomSelect } from "src/components/ui";
import {
  defaultRegisterFields,
  registerSchema,
  RegisterType,
  useRegisterMutation,
} from "./api/register-user";

export const RegisterPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterType>({
    mode: "onBlur",
    defaultValues: defaultRegisterFields,
    resolver: zodResolver(registerSchema),
  });
  const { mutate: register, isPending } = useRegisterMutation();

  const submitHandler = (data: RegisterType) => {
    register(data, {});
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: (theme) => theme.palette.primary.light,
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "500px",
          padding: "20px 15px",
          borderRadius: "4px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <AccountCircleIcon
            sx={{
              fill: (theme) => theme.palette.primary.main,
              fontSize: "65px",
            }}
          />
          <Typography
            fontWeight={500}
            sx={{ color: (theme) => theme.palette.secondary.main }}
          >
            Sign Up
          </Typography>
        </Box>
        <Box
          component={"form"}
          onSubmit={handleSubmit(submitHandler)}
          sx={{ ".form-container + .form-container": { mt: "10px" } }}
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

          <Box sx={{ marginBlock: "25px" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%", padding: "12px" }}
            >
              {isPending ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
