import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BadgeIcon from "@mui/icons-material/Badge";
import { useForm } from "react-hook-form";
import "./auth.scss";
import { useLoginUserMutation, useRegisterUserMutation } from "../../app/api/userApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectedUserInfo, userInfoHolder } from "../../app/features/userInfoSlice";
import { useNavigate } from "react-router-dom";

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
  const userInfo = useAppSelector(selectedUserInfo);
  const [newUser, setNewUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");

  const [registerUser, { isLoading: isRegisterLoading, isError: isRegisterError, error: registerError }] = useRegisterUserMutation();
  const [loginUser, { isLoading: isLoginLoading, isError: isLoginError, error: loginError }] = useLoginUserMutation();
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

        <button type="submit" disabled={isRegisterLoading || isLoginLoading}>
          Submit
        </button>

        <p>
          or <span onClick={() => setNewUser(!newUser)}>{newUser ? "Log In" : "Register"}</span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
