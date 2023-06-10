import FlexBetween from "../../components/FlexBetween";
import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import profileImage from "../../assets/user.png";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen, logout, btnRef, statusLog }) => {
  // const dispatch = useDispatch();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  const Tosignin =()=>{
    navigate("/signin");
  }
  const Tosignup =()=>{
    navigate("/signup");
  }

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        {statusLog != 200 ?
        <></>
        :
        <FlexBetween>
          <IconButton ref={el => btnRef.current.element1 = el} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon ref={el => btnRef.current.element2 = el}/>
          </IconButton>
        </FlexBetween>
        }
        

        {/* RIGHT SIDE */}
        {statusLog != 200 ?
        <FlexBetween gap="1.5rem">
        
        <IconButton onClick={Tosignin}>
          <LoginIcon sx={{ fontSize: "25px" }} />
        </IconButton>
        <IconButton onClick={Tosignup}>
          <PersonAddIcon sx={{ fontSize: "25px" }} />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined sx={{ fontSize: "25px" }} />
          ) : (
            <LightModeOutlined sx={{ fontSize: "25px" }} />
          )}
        </IconButton>

      </FlexBetween>
        :
        
        <FlexBetween gap="1.5rem">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: colors.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: colors.secondary[200] }}
                >
                  {user.email}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: colors.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={logout}>Profile</MenuItem>
              <MenuItem onClick={logout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
        }
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;