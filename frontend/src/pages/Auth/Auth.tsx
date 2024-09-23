import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BadgeIcon from "@mui/icons-material/Badge";
import { useForm } from "react-hook-form";
import "./auth.scss";
import { useLogOutUserMutation, useLoginUserMutation, useRegisterUserMutation } from "../../app/api/userApi";
import { useAppDispatch } from "../../app/hooks";
import { logout, userInfoHolder } from "../../app/features/userInfoSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface AuthStateError {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
}

const Auth = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [newUser, setNewUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");

  const [registerUser, { isLoading: isRegisterLoading, error: registerError }] = useRegisterUserMutation();
  const [loginUser, { isLoading: isLoginLoading, error: loginError }] = useLoginUserMutation();
  const [logOutUser] = useLogOutUserMutation();
  const [commonError, setCommonError] = useState("");

  const onSubmit = (data: Inputs) => {
    if (newUser) {
      registerSubmit(data);
    } else {
      handleLogIn(data);
    }
  };

  const registerSubmit = async (data: Inputs) => {
    try {
      const res = await registerUser(data).unwrap();
      dispatch(userInfoHolder(res));
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setCommonError((registerError as AuthStateError)?.data);
    }
  };

  const handleLogIn = async (data: Inputs) => {
    try {
      const res = await loginUser(data).unwrap();
      dispatch(userInfoHolder(res));
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setCommonError((loginError as AuthStateError)?.data);
    }
  };

  const logOuthandler = async () => {
    try {
      await logOutUser().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (pathname == "/logOut") {
      logOuthandler();
    }
  }, [pathname]);

  return (
    <div className="auth">
      <form onSubmit={handleSubmit(onSubmit)}>
        {newUser && (
          <>
            <label htmlFor="username">Name</label>
            <div>
              <input type="text" id="username" {...register("username", { required: "Please enter Name" })} />
              <BadgeIcon />
            </div>
            {errors.username && <p className="error">{errors.username.message}</p>}
          </>
        )}
        <label htmlFor="email">Email</label>
        <div>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Please enter Email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <AlternateEmailIcon />
        </div>
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <div>
          <input type={showPassword ? "text" : "password"} id="password" {...register("password", { required: "Please enter Password", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
          <div onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</div>
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}

        {newUser && (
          <>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div>
              <input type={showPassword ? "text" : "password"} id="confirmPassword" {...register("confirmPassword", { required: "Please enter confirm Password", validate: (v) => v === password || "Passwords do not match" })} />
              <div onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</div>
            </div>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
          </>
        )}

        <p className="error">{commonError}</p>

        <Button type="submit" variant="contained" disabled={isRegisterLoading || isLoginLoading}>
          Submit
        </Button>

        <p>
          or <span onClick={() => setNewUser(!newUser)}>{newUser ? "Log In" : "Register"}</span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
