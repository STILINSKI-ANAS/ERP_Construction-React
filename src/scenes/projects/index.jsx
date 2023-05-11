import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { SvgIcon } from "@mui/material";

const Projects = ({ user, isLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = () => {
    console.log("clicked");
  };

  if (isLoading == true) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="success" />
      </Box>
    );
  } else if (user.message == "Unauthenticated.") {
    console.log("Unauthenticated");
    return (
      <Box sx={{ display: "flex" }}>
        <Navigate to="/signin" />
      </Box>
    );
  } else {
    return (
      <Box m="20px">
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
              Download Reports
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" >
          {/* ROW 3 */}
          <Box
            onClick={handleClick}
            sx={{
              // border: '1px solid #ccc',
              // padding: 2,
              // borderRadius: 2,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            width={{ xs: "100%", sm: "48%", md: "30%" }}
            mb={2}
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Projet 1
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ApartmentIcon style={{ fontSize: 150 }} />
              {/* <SvgIcon>
              <path d="M16.5,5.5H5.5v11h11V5.5z M8,8h5v1H8V8z M8,10h5v1H8V10z M8,12h5v1H8V12z" />
            </SvgIcon> */}
              <Typography
                variant="h5"
                color={colors.secondary[500]}
                sx={{ mt: "15px" }}
              >
                Villa almanssour
              </Typography>
              <Typography>Details....</Typography>
            </Box>
          </Box>
          <Box
            onClick={handleClick}
            sx={{
              // border: '1px solid #ccc',
              // padding: 2,
              // borderRadius: 2,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            width={{ xs: "100%", sm: "48%", md: "30%" }}
            mb={2}
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Projet 2
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ApartmentIcon style={{ fontSize: 150 }} />
              {/* <SvgIcon>
              <path d="M16.5,5.5H5.5v11h11V5.5z M8,8h5v1H8V8z M8,10h5v1H8V10z M8,12h5v1H8V12z" />
            </SvgIcon> */}
              <Typography
                variant="h5"
                color={colors.secondary[500]}
                sx={{ mt: "15px" }}
              >
                Villa almanssour
              </Typography>
              <Typography>Details....</Typography>
            </Box>
          </Box>
          <Box
            onClick={handleClick}
            sx={{
              // border: '1px solid #ccc',
              // padding: 2,
              // borderRadius: 2,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            width={{ xs: "100%", sm: "48%", md: "30%" }}
            mb={2}
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Projet 3
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ApartmentIcon style={{ fontSize: 150 }} />
              {/* <SvgIcon>
              <path d="M16.5,5.5H5.5v11h11V5.5z M8,8h5v1H8V8z M8,10h5v1H8V10z M8,12h5v1H8V12z" />
            </SvgIcon> */}
              <Typography
                variant="h5"
                color={colors.secondary[500]}
                sx={{ mt: "15px" }}
              >
                Villa almanssour
              </Typography>
              <Typography>Details....</Typography>
            </Box>
          </Box>
          <Box
            onClick={handleClick}
            sx={{
              // border: '1px solid #ccc',
              // padding: 2,
              // borderRadius: 2,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            width={{ xs: "100%", sm: "48%", md: "30%" }}
            mb={2}
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Projet 4
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ApartmentIcon style={{ fontSize: 150 }} />
              {/* <SvgIcon>
              <path d="M16.5,5.5H5.5v11h11V5.5z M8,8h5v1H8V8z M8,10h5v1H8V10z M8,12h5v1H8V12z" />
            </SvgIcon> */}
              <Typography
                variant="h5"
                color={colors.secondary[500]}
                sx={{ mt: "15px" }}
              >
                Villa almanssour
              </Typography>
              <Typography>Details....</Typography>
            </Box>
          </Box>
          <Box
            onClick={handleClick}
            sx={{
              // border: '1px solid #ccc',
              // padding: 2,
              // borderRadius: 2,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            width={{ xs: "100%", sm: "48%", md: "30%" }}
            mb={2}
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Projet 5
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ApartmentIcon style={{ fontSize: 150 }} />
              {/* <SvgIcon>
              <path d="M16.5,5.5H5.5v11h11V5.5z M8,8h5v1H8V8z M8,10h5v1H8V10z M8,12h5v1H8V12z" />
            </SvgIcon> */}
              <Typography
                variant="h5"
                color={colors.secondary[500]}
                sx={{ mt: "15px" }}
              >
                Villa almanssour
              </Typography>
              <Typography>Details....</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default Projects;
