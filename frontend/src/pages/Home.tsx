import Button from "@mui/material/Button";
import { useAppSelector } from "../app/hooks";
import { selectedUserInfo } from "../app/features/userInfoSlice";

export default function Home() {
  const user = useAppSelector(selectedUserInfo);
  console.log(user);

  return (<Button variant="contained">Hello world</Button>);
}
