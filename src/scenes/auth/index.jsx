import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import Navbar from "../global/Navbar";
import Sidebar from "../global/Sidebar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "../../pages/SignIn";
// import { useGetUserQuery } from "state/api";

const Auth = ({logout, user, login}) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  

  // useEffect(() => {
  //   if(user.message == "Unauthenticated."){
  //     navigate(`/signin`);
  //     console.log('Unauthenticated')
  //   }
  // },[]);
  
//   const userId = useSelector((state) => state.global.userId);
  const { data } = [];

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {user.message == "Unauthenticated." ?
       <></>
       :
       <Sidebar
        user={user || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
       }
      
      <Box flexGrow={1}>
      <Navbar
          user={user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          logout={logout}
        />

       {user.message == "Unauthenticated." ?
      //  <SignIn login={login}/>
      <Outlet />
       :
       <Outlet />
       }
        
      </Box>
    </Box>
  );
};

export default Auth;