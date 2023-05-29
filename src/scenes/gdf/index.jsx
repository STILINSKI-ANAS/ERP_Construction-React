import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, Switch  } from "@mui/material";
import Header from "../../components/Header";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  Column,
  Editing,
  SearchPanel,
  Paging,
  HeaderFilter,
  HeaderTemplate,
  Pager,
} from "devextreme-react/data-grid";
import "../../App.css";
const Gdf = () => {
  const [data, setData] = useState([
    { Designation: "", PrixU: "", Qty: "", Total: "" },
  ]);
  const [devis, setDevis] = useState(false);
  const onoff = () => {
    setDevis(prevState => !prevState);
    // setData([...data, devis]);
  };

  const handleClick = () => {
    setData([...data, { Designation: "", PrixU: "", Qty: "", Total: "" }]);
  };
  const submit = () => {
    // setData([...data, { Designation: "", PrixU: "", Qty: "", Total: "" }]);
    console.log('Hiiii...');
  };
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...data];
    onchangeVal[i][name] = value;
    setData(onchangeVal);
  };
  const handleDelete = (i) => {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
  };
  // const dataSource = new DataSource({
  //   store: new CustomStore({
  //     load: function(options) {
  //       const requestOptions = {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       };

  //       const url = `http://127.0.0.1:8000/api/entrepot`;

  //       return fetch(url, requestOptions)
  //         .then(response => {
  //           if (!response.ok) {
  //               // console.log(response.json())
  //             throw new Error('Network response was not ok');
  //           }
  //           return response.json();
  //         })
  //         .then(result => {
  //           return {
  //             data: result,
  //             totalCount: result.length
  //           };
  //         })
  //         .catch(error => {
  //           console.error('There was a problem fetching data:', error);
  //         });
  //     },
  //     insert: function(values) {
  //       const requestOptions = {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(values)
  //       };
  //       const url = 'http://127.0.0.1:8000/api/entrepot/';

  //       return fetch(url, requestOptions)
  //         .then(response => {
  //           if (!response.ok) {
  //             throw new Error('Network response was not ok');
  //           }
  //           return response.json();
  //         })
  //         .catch(error => {
  //           console.error('There was a problem adding the data:', error);
  //         });
  //     },
  //     update: function(key, values) {
  //       const requestOptions = {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(values)
  //       };
  //       const url = `http://127.0.0.1:8000/api/entrepot/${key.id}`;
  //       // console.log(key)
  //       return fetch(url, requestOptions)
  //         .then(response => {
  //           if (!response.ok) {
  //             throw new Error('Network response was not ok');
  //           }
  //           return response.json();
  //         })
  //         .catch(error => {
  //           console.error('There was a problem updating the data:', error);
  //         });
  //     },
  //     remove: function(key) {
  //       const requestOptions = {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       };
  //       const url = `http://127.0.0.1:8000/api/entrepot/${key.id}`;

  //       return fetch(url, requestOptions)
  //         .then(response => {
  //           if (!response.ok) {
  //             throw new Error('Network response was not ok');
  //           }
  //         })
  //         .catch(error => {
  //           console.error('There was a problem deleting the data:', error);
  //         });
  //     }
  //   })
  // });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Generateur de Devis/Facture" subtitle="Generer un Devis/Facture" />
        <Box>
          <Button
            onClick={handleClick}
            color="secondary"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Ajouter
          </Button>
        </Box>
      </Box>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={1}>
        <Switch
          checked={devis}
          onChange={onoff}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        {data.map((val, i) => (
          <Grid item key={i} xs={12} sm={12} md={12} lg={12}>
            <Grid container columnSpacing={1}>
              <Grid item xs={3} md={3}>
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
              </Grid>
              <Grid item xs={3} md={3}>
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
              </Grid>
              <Grid item xs={3} md={3}>
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
              </Grid>
              <Grid item xs={3} md={2}>
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
              </Grid>
              <Grid item xs={3} md={1}>
                <Button
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    margin: "5px 0px 0px 0px",
                  }}
                  onClick={() => handleDelete(i)}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  <DeleteIcon sx={{ mr: "10px" }} />
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
        
      </Grid>
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(devis)}</p>
      <Box>
          <Button
            onClick={submit}
            color="secondary"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Done
          </Button>
        </Box>
    </Box>
  );
};
export default Gdf;
