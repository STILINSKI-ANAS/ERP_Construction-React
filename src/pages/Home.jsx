import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import AuthService from "../services/auth.service";


const Dashboard = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  return (
    <>
    <Box m="20px">
      <ToastContainer />
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.secondary[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            {props.user.name}
          </Button>
        </Box>
      </Box>  
    </Box>
    </>
    
  );
};

export default Dashboard;
