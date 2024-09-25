import DropDown from "../dropDown/DropDown";
import "./navigation.scss";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { useState } from "react";
import { AppBar, Container, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useGetProfileUserQuery } from "../../app/api/userApi";
import Loader from "../Loader";

const Navigation = () => {
  // const userInfo = useAppSelector(selectedUserInfo);
  const { data: userInfo, error, isLoading } = useGetProfileUserQuery();
  const [dropDown, setDropDown] = useState(false);
  return (
    <AppBar sx={{ backgroundColor: "#141414" }}>
      <Container>
        <nav className="header__navigation">
          <Link to="/">
            <Typography color="wheat" variant="h6" fontWeight={600}>
              BELCOR
            </Typography>
          </Link>
          <ul>
            <li>
              <Link to="/" data-text="Home">
                <HomeIcon />
              </Link>
            </li>
            <li>
              <Link to="/profile/favorite" data-text="Favorite">
                <FavoriteBorderOutlinedIcon />
              </Link>
            </li>
            <li>
              <Link to="/profile/basket" data-text="Basket">
                <ShoppingCartOutlinedIcon />
              </Link>
            </li>
            <>{isLoading && <Loader />}</>
            {userInfo?.isAdmin && (
              <li>
                <Link to="/profile/admin" data-text="Orders">
                  <AdminPanelSettingsIcon />
                </Link>
              </li>
            )}

            <li className="header__navigation-profile" onClick={() => setDropDown(!dropDown)}>
              {dropDown && (
                <DropDown
                  items={[
                    { label: `${userInfo?.username ? userInfo?.username : "Profile"}`, icon: <AccountBoxIcon />, href: "profile" },
                    { label: `${userInfo?.username ? "Log Out" : "Log In"}`, icon: <LogoutIcon />, href: "logOut" },
                  ]}
                />
              )}

              <AssignmentIndOutlinedIcon />
            </li>
          </ul>
        </nav>
      </Container>
    </AppBar>
  );
};

export default Navigation;
