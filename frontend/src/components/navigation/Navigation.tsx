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
import { AppBar, Container } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectedUserInfo } from "../../app/features/userInfoSlice";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Navigation = () => {
  const userInfo = useAppSelector(selectedUserInfo);
  const [dropDown, setDropDown] = useState(false);
  const user = false;

  return (
    <AppBar sx={{ backgroundColor: "#141414" }}>
      <Container>
        <nav className="header__navigation">
          <Link to="/">
            <h3>BELOR</h3>
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
            {userInfo?.isAdmin && (
              <li>
                <Link to="/profile/admin" data-text="Basket">
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

              {user ? <img src="" alt="avatar" /> : <AssignmentIndOutlinedIcon />}
            </li>
          </ul>
        </nav>
      </Container>
    </AppBar>
  );
};

export default Navigation;
