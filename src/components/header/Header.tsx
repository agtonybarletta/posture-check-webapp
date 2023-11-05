import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typograpy from "@mui/material/Typography";
import {
  AppBar,
  Divider,
  Drawer,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

function Header(props: any) {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <AppBar
      position="static"
      sx={{ left: 0, width: "100vw" }}
      color="transparent"
    >
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: "15vw" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <MenuList>
            <MenuItem></MenuItem>
            <MenuItem>
              {/*<ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>*/}
              <ListItemText>Item 1</ListItemText>
            </MenuItem>
            <MenuItem>
              {/*<ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>*/}
              <ListItemText>Item 2</ListItemText>
            </MenuItem>
            <MenuItem>
              {/*<ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>*/}
              <ListItemText>Item 3</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              {/*<ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>*/}
              <ListItemText>Item 4</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Drawer>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(!open)}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typograpy variant="h3">Posture Check</Typograpy>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
