import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import Navbar from "../global/Navbar";
import Sidebar from "../global/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../../pages/SignIn";
// import { useGetUserQuery } from "state/api"

import { Navigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Layout = ({logout, user, login, isLoading}) => {

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if(isLoading == true){
    return (
      <Box 
        sx={{ display: 'flex' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <CircularProgress color="success"/>
      </Box>
      )
  }else if(user.message == "Unauthenticated."){
    return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Box flexGrow={1}>
      <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          logout={logout}
      />
        <Outlet />
      </Box>
    </Box>
  )
  } else return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
       <Sidebar
        user={user || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
      <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          logout={logout}
        />
       <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;