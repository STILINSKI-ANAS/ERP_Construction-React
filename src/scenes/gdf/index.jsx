import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Switch, FormControlLabel } from "@mui/material";
import Header from "../../components/Header";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../App.css";

const Gdf = () => {
  const API_URL = "https://api.tourtit-travaux.com/api";
  const [data, setData] = useState([
    { Designation: "", PrixU: "", Qty: "", Total: "", Bold: false },
  ]);
  const [dataH, setDataH] = useState([
    { Designation: "Header",titre: "", name: "", addresse: "", num: "", date: "",methodePay: "",prixlettre: "", },
  ]);
  const onoff = (e, i) => {
    handleChange(e, i);
  };

  const handleClick = () => {
    setData([
      ...data,
      { Designation: "", PrixU: "", Qty: "", Total: "", Bold: false },
    ]);
  };
  const submit = () => {
    // setData([...data, { Designation: "", PrixU: "", Qty: "", Total: "" }]);
    console.log("Hiiii...");
  };
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    if (name == "Bold") {
      const onchangeVal = [...data];
      onchangeVal[i][name] = e.target.checked;
      setData(onchangeVal);
    } else {
      const onchangeVal = [...data];
      onchangeVal[i][name] = value;
      setData(onchangeVal);
    }
  };
  const HeaderChange = (e) => {
    const { name, value } = e.target;
      const onchangeVal = [...dataH];
      onchangeVal[0][name] = value;
      setDataH(onchangeVal);

  };
  const handleDelete = (i) => {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
  };

  const generatePDF = async () =>{
    var finalObj = dataH.concat(data);
    console.log(finalObj);
    const rnd = Math.floor(Math.random() * 9000) + 1000;
    const response = await fetch(API_URL +"/generatePDF?name=" + rnd,{
      method: "POST",
      headers: {
        "Content-Type": "application/json","Accept": "application/json",'X-Requested-With':'XMLHttpRequest'
      },
      credentials:'include',
      body: JSON.stringify(finalObj),
    }).then(
      response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            if(blob.type == "application/pdf"){
              // console.log(blob.type);
              alink.download = rnd +"-facture.pdf";
              alink.click();
            }else{
              toast.error('Entrer les Totaux !!!');
            }
            
        })
    });
    // const content = await response.json();
    // console.log(content);
  }

  return (
    <Box m="20px">
      <ToastContainer 
        theme="colored"/>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Generateur de Devis/Facture"
          subtitle="Generer un Devis/Facture"
        />
        <Box>
        <Button
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "5px",
          }}
          onClick={() => generatePDF()}
          type="submit"
          color="secondary"
          variant="contained"
        >
          <DoneAllIcon sx={{ mr: "10px" }} />
          Done
        </Button>
          <Button
            onClick={handleClick}
            color="secondary"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "5px",
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Ajouter
          </Button>
        </Box>
      </Box>
      <Box
        overflow="auto"
        sx={{ boxShadow: 3 }}
      >
        <Box
            key={85}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`2px solid `}
            p="10px"
            minWidth={1000}
          >
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="titre"
                defaultValue={dataH.titre}
                id="titre"
                name="titre"
                onChange={(e) => HeaderChange(e)}
              />
            </Box>
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="name"
                defaultValue={dataH.name}
                id="name"
                name="name"
                onChange={(e) => HeaderChange(e)}
              />
            </Box>
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="addresse"
                defaultValue={dataH.addresse}
                id="addresse"
                name="addresse"
                onChange={(e) => HeaderChange(e)}
              />
            </Box>
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="num"
                defaultValue={dataH.titre}
                id="num"
                name="num"
                onChange={(e) => HeaderChange(e)}
              />
            </Box>
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="date"
                defaultValue={dataH.date}
                id="date"
                name="date"
                onChange={(e) => HeaderChange(e)}
              />
            </Box>
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="methodePay"
                defaultValue={dataH.methodePay}
                id="methodePay"
                name="methodePay"
                onChange={(e) => HeaderChange(e)}
              />
            </Box>
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="prixlettre"
                defaultValue={dataH.prixlettre}
                id="prixlettre"
                name="prixlettre"
                onChange={(e) => HeaderChange(e)}
              />
            </Box>
          </Box>
        {data.map((val, i) => (
          <Box
            key={`${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid `}
            p="10px"
            minWidth={1000}
          >
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Designation"
                defaultValue={val.x}
                id="Designation"
                name="Designation"
                onChange={(e) => handleChange(e, i)}
              />
            </Box>
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Prix U"
                defaultValue={val.x}
                id="PrixU"
                name="PrixU"
                onChange={(e) => handleChange(e, i)}
              />
            </Box>

            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Qty"
                defaultValue={val.x}
                id="Qty"
                name="Qty"
                onChange={(e) => handleChange(e, i)}
              />
            </Box>
            <Box sx={{ width: 1, m:1 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Total"
                defaultValue={val.x}
                id="Total"
                name="Total"
                onChange={(e) => handleChange(e, i)}
              />
            </Box>
            <Box sx={{ width: 0.25, m:1 }} >
              <FormControlLabel
                control={<Switch
                  id="Bold"
                  name="Bold"
                  checked={val.x}
                  // onChange={onoff}
                  onChange={(e) => onoff(e, i)}
                  inputProps={{ "aria-label": "controlled" }}
                />}
                label="Titre"
              />
            </Box>
            <Box sx={{ width: 0.25, m:1 }}>
              <Button
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  margin: "0px 0px 0px 0px",
                }}
                onClick={() => handleDelete(i)}
                type="submit"
                color="secondary"
                variant="contained"
              >
                <DeleteIcon sx={{ mr: "0px" }} />
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

    </Box>
  );
};
export default Gdf;
