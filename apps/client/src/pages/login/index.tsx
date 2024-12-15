import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import loginImage from "../../assets/login-image.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CustomInput } from "../../components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email("Email must be valid"),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

type FormType = z.infer<typeof formSchema>;

const defaultValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormType>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(formSchema),
  });
  const isLoading = false;
  const navigate = useNavigate();

  console.log("errors", errors);
  const submitHandler = (data: FormType) => {
    console.log("data", data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        "& img": {
          width: "100%",
          height: "100vh",
          objectFit: "cover",
        },
      }}
    >
      <Box
        sx={{
          width: "50%",
          position: "relative",
          backgroundImage: `linear-gradient(45deg,rgba(0,0,0,0.8),transparent),url(${loginImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          "& h1": {
            color: "white",
            textAlign: "center",
            fontSize: "60px",
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          },
        }}
      >
        <h1>Artist Management System</h1>
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
            padding: "40px 15px",
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
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              color: (theme) => theme.palette.secondary.main,
              fontWeight: "500",
            }}
          >
            Sign In
          </Typography>
          <div>
            <form onSubmit={handleSubmit(submitHandler)}>
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
                  {isLoading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Box>
            </form>
          </div>
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
