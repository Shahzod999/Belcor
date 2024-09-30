import { useForm } from "react-hook-form";
import { useUpdateUserProfileMutation } from "../../app/api/userApi";
import { selectedUserInfo, userInfoHolder } from "../../app/features/userInfoSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, FormControl, FormHelperText, Input, InputAdornment, InputLabel, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Loader from "../../components/Loader";
import { Inputs } from "../../app/types/formTypes";

const Profile = () => {
  const inputLabelStyles = {
    fontWeight: 600,
    "&.Mui-focused": { color: "white" },
    "&.MuiInputLabel-root.Mui-focused": { color: "white" },
  };

  const userInfo = useAppSelector(selectedUserInfo);
  const [updateUserProfile, { isLoading: updateProfileLoading }] = useUpdateUserProfileMutation();
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const password = watch("password");

  const onSubmit = async (data: Inputs) => {
    console.log(data,'profile');
    
    try {
      const res = await updateUserProfile({ _id: userInfo?._id, ...data }).unwrap();
      dispatch(userInfoHolder({ ...res }));
    } catch (error) {
      console.log(error, "profile");
    }
  };

  return (
    <Paper elevation={0} sx={{ mt: 10, padding: 2, backgroundColor: "darkslategray" }} variant="elevation">
      <Typography variant="h4">Profile</Typography>
      <Typography sx={{ marginBottom: 2 }}>Would you like to change the information?</Typography>
      {updateProfileLoading && (
        <Box sx={{ position: "fixed", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Loader />
        </Box>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="username" sx={inputLabelStyles}>
            User Name
          </InputLabel>
          <Input {...register("username", { required: "Please enter Name" })} type="text" disableUnderline={true} defaultValue={userInfo?.username} />
          {errors.username && <FormHelperText sx={{ color: "#d15e5e" }}>{errors.username?.message}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="email" sx={inputLabelStyles}>
            e-mail
          </InputLabel>
          <Input
            {...register("email", {
              required: "Please enter Email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            autoComplete="email"
            disableUnderline={true}
            defaultValue={userInfo?.email}
          />
          {errors.email && <FormHelperText sx={{ color: "#d15e5e" }}>{errors.email.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password" sx={inputLabelStyles}>
            password
          </InputLabel>
          <Input
            {...register("password", { minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            type={showPassword ? "password" : "input"}
            autoComplete="password"
            disableUnderline={true}
            endAdornment={
              showPassword ? (
                <InputAdornment position="end">
                  <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} />
                </InputAdornment>
              ) : (
                <InputAdornment position="end">
                  <VisibilityIcon onClick={() => setShowPassword(!showPassword)} />
                </InputAdornment>
              )
            }
          />
          {errors.password && <FormHelperText sx={{ color: "#d15e5e" }}>{errors.password.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="confirmPassword" sx={inputLabelStyles}>
            Confirm Password
          </InputLabel>
          <Input
            {...register("confirmPassword", {
              validate: (v) => {
                if (!password) {
                  return true;
                }
                return v === password || "Passwords do not match";
              },
            })}
            type={showPassword ? "password" : "input"}
            autoComplete="confirmPassword"
            disableUnderline={true}
            endAdornment={
              showPassword ? (
                <InputAdornment position="end">
                  <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} />
                </InputAdornment>
              ) : (
                <InputAdornment position="end">
                  <VisibilityIcon onClick={() => setShowPassword(!showPassword)} />
                </InputAdornment>
              )
            }
          />
          {errors.confirmPassword && <FormHelperText sx={{ color: "#d15e5e" }}> {errors.confirmPassword.message}</FormHelperText>}
        </FormControl>
        <Button disabled={false} disableRipple fullWidth variant="outlined" type="submit" sx={{ mt: 4, color: "white", borderColor: "white" }}>
          Change
        </Button>
      </form>
    </Paper>
  );
};

export default Profile;
