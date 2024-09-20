import DropDown from "../dropDown/DropDown";
import "./navigation.scss";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Navigation = () => {
  return (
    <nav className="header__navigation container">
      <Link to="/">
        <h3>BELOR</h3>
      </Link>
      <ul>
        <li>
          <Link to="/Home" data-text="Home">
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link to="/" data-text="Favorite">
            <FavoriteBorderOutlinedIcon />
          </Link>
        </li>
        <li>
          <Link to="/" data-text="Basket">
            <ShoppingCartOutlinedIcon />
          </Link>
        </li>
        <li className="header__navigation-profile">
          <DropDown
            items={[
              { label: "Profile", icon: <AccountBoxIcon /> },
              { label: "Logout", icon: <LogoutIcon /> },
            ]}
          />{" "}
          <img src="" alt="userPic" />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
