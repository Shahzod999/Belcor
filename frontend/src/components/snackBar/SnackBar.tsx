import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectedValueSnackBar,
  toggleSnackBar,
} from "../../app/features/snackBarSlice";

const MySnackbar = () => {
  const dispatch = useAppDispatch();
  const snackBarState = useAppSelector(selectedValueSnackBar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(toggleSnackBar({ isActive: false }));
  };

  return (
    <Snackbar
      open={snackBarState.isActive}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}>

      <Alert onClose={handleClose} severity={`${snackBarState.error ? "error" : "success"}`} sx={{ width: "100%" }}>
        {snackBarState.text}
      </Alert>


    </Snackbar>
  );
};

export default MySnackbar;
