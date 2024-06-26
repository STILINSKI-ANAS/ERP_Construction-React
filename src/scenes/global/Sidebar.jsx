import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import ConstructionIcon from '@mui/icons-material/Construction';
import PaymentsIcon from '@mui/icons-material/Payments';
import FoundationIcon from '@mui/icons-material/Foundation';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { useRef } from "react";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Gestion de Projets",
    icon: <FoundationIcon />,
  },
  {
    text: "Gestion d'Entrepot",
    icon: <InventoryOutlinedIcon/>,
  },
  {
    text: "Gestion d'Ouvriers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Gestion de Clients",
    icon: <GroupOutlinedIcon />,
  },
  {
    text: "Gestion de fournisseur",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Gestion de Matériel de Location",
    icon: <ConstructionIcon />,
  },
  {
    text: "Generateur de devis",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Gestion de payements",
    icon: <PaymentsIcon />,
  },
  {
    text: "Gestion de Commandes",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  btnRef
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const cusref = useRef();
  const closeSide = e =>{
    if((e.srcElement !== btnRef.current.element2) && (e.srcElement !== btnRef.current.element1)){
      setIsSidebarOpen(false);
    }
  }
  useEffect(() => {
    setActive(pathname.substring(1));
    document.body.addEventListener('click',closeSide);
    return() => document.body.removeEventListener('click', closeSide);
  }, [pathname]);

  return (
    <Box component="nav" width={250} >
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold" color={colors.secondary[100]}>
                    JARD TOURTIT
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        boxShadow: 3,
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[100]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* <Box position="absolute" bottom="1rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1.5rem" m="1rem 1rem 0rem 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.email}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box> */}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;