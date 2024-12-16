import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import loginImage from "src/assets/login-image.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import {
  defaultLoginField,
  loginSchema,
  LoginType,
  useLoginMutation,
} from "./api/useLoginMutation";
import { CustomInput } from "src/components/ui";

export const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginType>({
    mode: "onBlur",
    defaultValues: defaultLoginField,
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLoginMutation();

  const submitHandler = (data: LoginType) => {
    login(data);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          width: "50%",
          backgroundImage: `linear-gradient(45deg,rgba(0,0,0,0.8),transparent),url(${loginImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="h1"
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "4rem",
            lineHeight: 1.2,
          }}
        >
          Artist Management System
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: (theme) => theme.palette.primary.light,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "350px",
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
              Sign In
            </Typography>
          </Box>
          <Box
            component={"form"}
            onSubmit={handleSubmit(submitHandler)}
            sx={{ ".form-container + .form-container": { mt: "10px" } }}
          >
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

            <Box sx={{ marginBlock: "25px" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "100%", padding: "12px" }}
              >
                {isPending ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "12px",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {"Don't have an account ?"}{" "}
            <Box
              component="span"
              sx={{
                cursor: "pointer",
                color: (theme) => theme.palette.secondary.main,
              }}
              onClick={() => navigate("/register")}
            >
              Create one
            </Box>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};
