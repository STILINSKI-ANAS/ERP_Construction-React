import { Box, Button, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddIcon from '@mui/icons-material/Add';
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import { ButtonBase } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef } from "react";
const Projects = ({ user, isLoading }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [projets, setProjets] = useState([]);
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(999);

  const API_URL = "https://api.tourtit-travaux.com/api";
  const reqHeaders = {
    headers: {
      "Content-Type": "application/json","Accept": "application/json",'X-Requested-With':'XMLHttpRequest'
    }}

  const getdata = async () =>{
    const response = await fetch(API_URL + '/projet',{
    reqHeaders,
    credentials:'include',
      },[])
    const contenttemp = await response.json();
    setProjets(contenttemp);
    // setisLoading(false);
    console.log(contenttemp);
  };
  const addProjet = async () =>{
    await fetch(API_URL +"/projet",{
      method: "POST",
      reqHeaders,
      credentials:'include',
    }).then(({ data }) => {
        console.log(data);
        // navigate("/gestion de societe");
      })
      .catch(({ response }) => {});
      getdata();
    console.log('add projet')
  }
  const deleteProjet = async () =>{
    console.log(idDelete, 'delete');
    await fetch(API_URL +"/projet/" + idDelete,{
      method: "DELETE",
      reqHeaders,
      credentials:'include',
    }).then(({ data }) => {
        console.log(data);
      });
      getdata();
      setOpen(false);
    // console.log('add projet')
  }

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdDelete(id)
    console.log(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getdata();
  }, [])

  const handleClick = () => {
    console.log("clicked");
  };

  // const Transition = forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

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
          <Header title="PROJETS" subtitle="Voici Vos Projets" />

          <Box>
            <Button
              onClick={()=>{addProjet()}}
              sx={{
                backgroundColor: colors.secondary[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <AddIcon sx={{ mr: "10px" }} />
              Ajouter Projet
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
        ></Box>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={3}>
          {
              projets.map((curElem) => {
                  return (
                      <Grid key={curElem.id} xs={12} sm={6} md={4} lg={3}>
                      <Card sx={{ borderRadius: 4, }}>
                        <CardActionArea onClick={() => navigate("/editprojet/" + curElem.id)} sx={{minHeight: 250}}>
                          <CardMedia
                            component="img"
                            height="180"
                            image="src/assets/773830.jpg"
                            alt="Construction"
                            sx={{objectFit: "cover" }}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {curElem.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {curElem.addresse}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions disableSpacing={true} sx={{ flexDirection: 'row-reverse' }}>
                          <Button size="small" color="error" onClick={() =>handleClickOpen(curElem.id)}>
                            Suprimmer
                          </Button>
      
                        </CardActions>
                      </Card>
                    </Grid>
                  )
              })
          }
          <Dialog
            open={open}
            // TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Voulez vous vraiment suprimmer ce prejet"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                La suppression de ce projet est irreversible
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="success">Annuler</Button>
              <Button onClick={()=>{deleteProjet()}} variant="error">Suprimmer</Button>
            </DialogActions>
          </Dialog>

        </Grid>
      </Box>
    );
  }
};

export default Projects;
