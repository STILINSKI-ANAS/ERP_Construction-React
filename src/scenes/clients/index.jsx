import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
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
import '../../App.css';
const Clients = () =>{

  const API_URL = "https://api.tourtit-travaux.com/api";

  const dataSource = new DataSource({
    store: new CustomStore({
      load: function(options) {
        const requestOptions = {
          method: 'GET',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const url = `http://127.0.0.1:8000/api/client`;
  
        return fetch(API_URL + "/client", requestOptions)
          .then(response => {
            if (!response.ok) {
                // console.log(response.json())
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(result => {
            return {
              data: result,
              totalCount: result.length
            };
          })
          .catch(error => {
            console.error('There was a problem fetching data:', error);
          });
      },
      insert: function(values) {
        const requestOptions = {
          method: 'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        };
        const url = 'http://127.0.0.1:8000/api/client';
  
        return fetch(API_URL + "/client", requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch(error => {
            console.error('There was a problem adding the data:', error);
          });
      },
      update: function(key, values) {
        const requestOptions = {
          method: 'PUT',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        };
        const url = `http://127.0.0.1:8000/api/client/${key.id}`;
        // console.log(key)
        return fetch(API_URL + "/client/" + key.id, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch(error => {
            console.error('There was a problem updating the data:', error);
          });
      },
      remove: function(key) {
        const requestOptions = {
          method: 'DELETE',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const url = `http://127.0.0.1:8000/api/client/${key.id}`;
  
        return fetch(API_URL + "/client/" + key.id, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          })
          .catch(error => {
            console.error('There was a problem deleting the data:', error);
          });
      }
    })
  });

return (
  <Box m="20px">
    <Header
      title="Clients"
      subtitle="Gestion de vous clients"
      sx={{ gridColumn: "span 2" }}
    />
    {/* <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      <Grid item>
        <Button
          onClick={() => {}}
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add
        </Button>
      </Grid>
    </Grid> */}
    <Box height="75vh" p={1}>
      <DataGrid
        dataSource={dataSource}
        allowColumnResizing={true}
        allowColumnReordering={true}
        columnAutoWidth={true}
        className="mui-data-grid"
        showBorders={false}
        rowAlternationEnabled={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showInfo={true} showNavigationButtons={true} />
        <SearchPanel visible={true} />
        <Editing
          mode="cell"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          useIcons={true}
        />
        <HeaderFilter visible={true} />
        <Column maxWidth={100} dataField="name" caption="Nom"/>
        <Column maxWidth={100} dataField="addresse" caption="Addresse" />
        <Column maxWidth={100} dataField="CIN" caption="CIN" />
        <Column maxWidth={100} dataField="email" caption="Email" />
        <Column maxWidth={100} dataField="phoneNumber" caption="Numéro de téléphone" /> 
        <Column maxWidth={100} dataField="balance" caption="Balance"/>
        <Column
          type="buttons"
          width={80}
          buttons={[
            {
              name: "delete",
              icon: "trash",
              hint: "Delete",
              visible: true,
            },
          ]}
        ></Column>
      </DataGrid>
    </Box>
  </Box>
);
};
export default Clients;