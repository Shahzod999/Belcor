import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box sx={{ zIndex: 999, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} position={"absolute"}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
