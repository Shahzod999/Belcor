import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { AppBar, Container, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useGetProfileUserQuery } from "../../app/api/userApi";
import Loader from "../Loader";
import "./navigation.scss";
import SearchBar from "./SearchBar";

const Navigation = () => {
  const { pathname } = useLocation();
  const { data: userInfo, isLoading } = useGetProfileUserQuery();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#141414" }} position="fixed">
      <Container>
        <nav className="header__navigation">
          <Link to="/">
            <Typography color="wheat" variant="h6" fontWeight={600}>
              BELCOR
            </Typography>
          </Link>

          {pathname == "/" && <SearchBar />}
          <List className="desktop-nav">
            <ListItem>
              <Link to="/" data-text="Home">
                <HomeIcon />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/profile/favorite" data-text="Favorite">
                <FavoriteBorderOutlinedIcon />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/profile/basket" data-text="Basket">
                <ShoppingCartOutlinedIcon />
              </Link>
            </ListItem>
            <>{isLoading && <Loader />}</>
            {userInfo?.isAdmin && (
              <ListItem>
                <Link to="/profile/admin" data-text="Orders">
                  <AdminPanelSettingsIcon />
                </Link>
              </ListItem>
            )}

            <ListItem className="header__navigation-profile">
              <IconButton onClick={handleProfileClick} color="inherit">
                <AssignmentIndOutlinedIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }}>
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/profile">
                    <AccountBoxIcon sx={{ marginRight: "10px" }} />
                    {userInfo?.username ? userInfo?.username : "Profile"}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/logOut">
                    <LogoutIcon sx={{ marginRight: "10px" }} />
                    {userInfo?.username ? "Log Out" : "Log In"}
                  </Link>
                </MenuItem>
              </Menu>
            </ListItem>
          </List>

          <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)} className="mobile-menu-button" sx={{ padding: 3 }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
            <List>
              <ListItem component={Link} to="/" onClick={() => toggleDrawer(false)}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem component={Link} to="/profile/favorite" onClick={() => toggleDrawer(false)}>
                <ListItemIcon>
                  <FavoriteBorderOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Favorite" />
              </ListItem>
              <ListItem component={Link} to="/profile/basket" onClick={() => toggleDrawer(false)}>
                <ListItemIcon>
                  <ShoppingCartOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Basket" />
              </ListItem>

              {userInfo?.isAdmin && (
                <ListItem component={Link} to="/profile/admin" onClick={() => toggleDrawer(false)}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>
              )}
            </List>

            <List>
              <ListItem component={Link} to="/profile" onClick={() => toggleDrawer(false)}>
                <ListItemIcon>
                  <AccountBoxIcon sx={{ marginRight: "10px" }} />
                </ListItemIcon>
                <ListItemText primary={userInfo?.username ? userInfo?.username : "Profile"} />
              </ListItem>
              <ListItem component={Link} to="/logOut" onClick={() => toggleDrawer(false)}>
                <ListItemIcon>
                  <LogoutIcon sx={{ marginRight: "10px" }} />
                </ListItemIcon>
                <ListItemText primary={userInfo?.username ? "Log Out" : "Log In"} />
              </ListItem>
            </List>
          </Drawer>
        </nav>
      </Container>
    </AppBar>
  );
};

export default Navigation;
