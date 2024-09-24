import { useForm } from "react-hook-form";
import { useUpdateUserProfileMutation } from "../../app/api/userApi";
import { selectedUserInfo } from "../../app/features/userInfoSlice";
import { useAppSelector } from "../../app/hooks";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, FormControl, Input, InputAdornment, InputLabel, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Inputs } from "../../app/types/formTypes";

const Profile = () => {
  // уважаемые Belcor) я хотел внедрить компонент auth сюда, но так легко будет потерять чиатбельность кода

  const inputLabelStyles = {
    fontWeight: 600,
    "&.Mui-focused": { color: "white" }, // Цвет при фокусировке
    "&.MuiInputLabel-root.Mui-focused": { color: "white" }, // Цвет при взаимодействии
  };

  const userInfo = useAppSelector(selectedUserInfo);
  const [updateUserProfile, { isLoading: updateProfileLoading }] = useUpdateUserProfileMutation();
  const [showPassword, setShowPassword] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: Inputs) => {
    console.log(data);
  };

  return (
    <Paper elevation={0} sx={{ mt: 10, padding: 2, backgroundColor: "darkslategray" }} variant="elevation">
      <Typography variant="h4">Profile</Typography>
      <Typography sx={{ marginBottom: 2 }}>Would you like to change the information?</Typography>

      <form >
        <FormControl required fullWidth margin="normal">
          <InputLabel htmlFor="userName" sx={inputLabelStyles}>
            User Name
          </InputLabel>
          <Input name="userName" type="text" disableUnderline={true} />
        </FormControl>

        <FormControl required fullWidth margin="normal">
          <InputLabel htmlFor="email" sx={inputLabelStyles}>
            e-mail
          </InputLabel>
          <Input name="email" type="email" autoComplete="email" disableUnderline={true} />
        </FormControl>
        <FormControl required fullWidth margin="normal">
          <InputLabel htmlFor="email" sx={inputLabelStyles}>
            password
          </InputLabel>
          <Input
            name="password"
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
        </FormControl>
        <FormControl required fullWidth margin="normal">
          <InputLabel htmlFor="email" sx={inputLabelStyles}>
            Confirm Password
          </InputLabel>
          <Input
            name="password"
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
        </FormControl>

        <Button disabled={false} disableRipple fullWidth variant="outlined" type="submit" sx={{ mt: 4, color: "white", borderColor: "white" }}>
          Change
        </Button>
      </form>
    </Paper>
  );
};

export default Profile;
