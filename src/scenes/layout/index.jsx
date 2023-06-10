import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../global/Navbar";
import Sidebar from "../global/Sidebar";
import { useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';


const Layout = ({logout, user, login, isLoading, statusLog}) => {

  // const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isNonMobile = false;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const btnRef = useRef({});
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
  }else if(statusLog != 200){
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
        btnRef={btnRef}
        statusLog={statusLog}
      />
      <Box flexGrow={1}>
        <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          logout={logout}
          btnRef={btnRef}
          statusLog={statusLog}
        />
       <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;