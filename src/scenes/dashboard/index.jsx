import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FoundationIcon from '@mui/icons-material/Foundation';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChartPayement from "../../components/BarChartPayement";
import BarChartCharge from "../../components/BarChartCharge";
import StatBox from "../../components/StatBox";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";


const Dashboard = ({user, isLoading, statusLog}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stat, setStat] = useState({});
  const API_URL = "https://api.tourtit-travaux.com/api";

  const [payement, setPayement] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        API_URL + "/charts/7"
      );
      const response2 = await axios.get(
        API_URL + "/charts/8"
      ); // Replace '/api/sum-by-day' with your Laravel endpoint URL
      setStat(response.data);
      // setStat(response2.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getdata = async () =>{
    const response = await fetch(API_URL + '/paiement',{
      headers: {
        "Content-Type": "application/json","Accept": "application/json",'X-Requested-With':'XMLHttpRequest'
      },
    credentials:'include',
      },[])
    const contenttemp = await response.json();
    setPayement(contenttemp);
    // setisLoading(false);
    console.log(payement);
  };

  useEffect(() => {
    fetchData();
    getdata()

    // console.log(payement);
  }, []);

  if(isLoading == true){
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress color="success"/>
      </Box>
      )
  }else if(statusLog != 200){
    console.log('Unauthenticated')
    return (
    <Box sx={{ display: 'flex' }}>
      <Navigate to="/signin" />
    </Box>
    );
  } else{
    return (
      <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TABLEAU DE BORD" subtitle="Voici Vos Statistiques" />

        <Box>
          {/* <Button
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
          </Button> */}
        </Box>
      </Box>
      <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid key={1} xs={12} sm={6} md={6} lg={3}>
          <Box
            p="15px"
            backgroundColor={colors.primary[450]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ boxShadow: 3 }}
          >
            <StatBox
              title={stat.project_count + " Projets"}
              subtitle="Nouveau projets"
              progress="0.75"
              increase="(30 Jour)"
              icon={
                <FoundationIcon
                  sx={{ color: colors.primary[1000], fontSize: "26px" }}
                />
              }
            />
          </Box>
          </Grid>
          <Grid key={2} xs={12} sm={6} md={6} lg={3}>
          <Box
            p="15px"
            backgroundColor={colors.primary[450]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ boxShadow: 3 }}
          >
            <StatBox
              title={"MAD "+stat.chiffre}
              subtitle="Chiffre d'affaire"
              progress="0.75"
              increase="(30 Jour)"
              icon={
                <AttachMoneyIcon
                  sx={{ color: colors.primary[1000], fontSize: "26px" }}
                />
              }
            />
          </Box>
          </Grid>
          <Grid key={3} xs={12} sm={6} md={6} lg={3}>
          <Box
            p="15px"
            backgroundColor={colors.primary[450]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ boxShadow: 3 }}
            
          >
            <StatBox
              title={"MAD "+stat.evalu_Entrepot}
              subtitle="Valeur de L'entrepot"
              progress="0.75"
              increase=""
              icon={
                <WarehouseIcon
                  sx={{ color: colors.primary[1000], fontSize: "26px" }}
                />
              }
            />
          </Box>
          </Grid>
          <Grid key={4} xs={12} sm={6} md={6} lg={3}>
          <Box
            p="15px"
            backgroundColor={colors.primary[450]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ boxShadow: 3 }}
          >
            <StatBox
              title={stat.client_count + " Clients"}
              subtitle="Nouveau Client"
              progress="0.75"
              increase="(30 Jour)"
              icon={
                <GroupOutlinedIcon
                  sx={{ color: colors.primary[1000], fontSize: "26px" }}
                />
              }
            />
          </Box>
          </Grid>
          <Grid key={5} xs={12} sm={12} md={6} lg={6}>
            <BarChartPayement isDashboard={true} />
          </Grid>
          <Grid key={6} xs={12} sm={12} md={6} lg={6}>
            <BarChartCharge isDashboard={true} />
          </Grid>
          <Grid key={7} xs={12} sm={12} md={4} lg={4}>
            <Box
              backgroundColor={colors.primary[450]}
              overflow="auto"
              height="350px"
              sx={{ boxShadow: 3 }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[470]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Derniers Paiements
                </Typography>
              </Box>
              {payement.map((transaction, i) => (
                <Box
                  key={`${transaction.id}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[470]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.secondary[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {new Date(transaction.created_at).toLocaleString('fr-FR', {year: 'numeric',month: 'long',day: 'numeric',})}
                      
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.client.name}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.secondary[600]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    MAD {transaction.somme}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          {/* <Grid key={8} xs={12} sm={12} md={4} lg={4}>
            <Box
              backgroundColor={colors.primary[450]}
              overflow="auto"
              height="350px"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Derniers Paiements
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.secondary[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.secondary[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid key={9} xs={12} sm={12} md={4} lg={4}>
            <Box
              backgroundColor={colors.primary[450]}
              overflow="auto"
              height="350px"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Derniers Paiements
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.secondary[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.secondary[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid> */}
          <Grid key={9} xs={12} sm={12} md={8} lg={8}>
            <LineChart isDashboard={true} />
          </Grid>
          
        </Grid>
      {/* GRID & CHARTS */}
      <Box
      mt={5}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        
        {/* ROW 1 */}
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[450]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Nouveau projets"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.secondary[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[450]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Stock"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.secondary[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[450]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="Nouveau Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.secondary[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[450]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.secondary[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[450]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.secondary[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.secondary[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChartPayement isDashboard={true} />

          </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[450]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.secondary[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.secondary[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[450]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.secondary[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[450]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[450]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
      </Box>
    );
  }
};

export default Dashboard;
