import "./dropDown.scss";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

interface DropDownProps {
  items: { label: string; icon: JSX.Element; href?: string }[];
}

const DropDown = ({ items }: DropDownProps) => {
  const handleDropDownClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Box className="dropDown" onClick={handleDropDownClick}>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            {item.href ? (
              <Link to={item.href}>
                <ListItemButton sx={{ justifyContent: "space-between" }}>
                  <ListItemText>{item.icon}</ListItemText>
                  <ListItemText>{item.label}</ListItemText>
                </ListItemButton>
              </Link>
            ) : (
              <ListItemButton>
                <ListItemText>{item.icon}</ListItemText>
                <ListItemText>{item.label}</ListItemText>
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DropDown;
