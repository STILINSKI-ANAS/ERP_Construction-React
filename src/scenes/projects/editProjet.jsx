import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme.js";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

import {
  DataGrid,
  Column,
  Editing,
  SearchPanel,
  Paging,
  HeaderFilter,
  HeaderTemplate,
  Pager,
  Lookup,
  GroupPanel,
  Grouping,
  Scrolling,
} from "devextreme-react/data-grid";

const EditProjet = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [editContent, setEditContent] = useState([]);
  const [capital, setCapital] = useState("");
  const [RC, setRC] = useState("");
  const [ICE, setICE] = useState("");
  const [email, setEmail] = useState("");
  const [articles, setArticles] = useState([]);
  const [clients, setClients] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [materiels, setMateriels] = useState([]);
  const [addresse, setAddresse] = useState("");
  const [numEmployes, setEmployes] = useState("");
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const { id } = useParams();

  const API_URL = "https://api.tourtit-travaux.com/api";
  // const API_URL = "http://localhost/ERP_Construction_Api/public/api";

  const reqHeaders = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  };
  const getProjet = async () => {
    const response = await fetch(
      API_URL + "/projet/" + id,
      {
        reqHeaders,
        credentials: "include",
      },
      []
    );
    const data = await response.json();
    setEditContent(data);
    // console.log(editContent);
  };

  const getArticles = async () => {
    const response = await fetch(
      API_URL + "/entrepot",
      {
        reqHeaders,
        credentials: "include",
      },
      []
    );
    const data = await response.json();
    setArticles(data);
    // console.log(editContent);
  };

  const getClients = async () => {
    const response = await fetch(
      API_URL + "/client",
      {
        reqHeaders,
        credentials: "include",
      },
      []
    );
    const data = await response.json();
    setClients(data);
    // console.log(editContent);
  };

  const getWorkers = async () => {
    const response = await fetch(
      API_URL + "/worker",
      {
        reqHeaders,
        credentials: "include",
      },
      []
    );
    const data = await response.json();
    setWorkers(data);
    // console.log(editContent);
  };

  const getMateriels = async () => {
    const response = await fetch(
      API_URL + "/materiel",
      {
        reqHeaders,
        credentials: "include",
      },
      []
    );
    const data = await response.json();
    setMateriels(data);
    // console.log(editContent);
  };
  const dataUtlisation = new DataSource({
    store: new CustomStore({
      load: function (options) {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const url = `http://127.0.0.1:8000/api/utilisation/getByProjetId/${id}`;

        return fetch(API_URL + "/utilisation/getByProjetId/" + id, {
          method: "GET",
          reqHeaders,
          credentials: "include",
        })
          .then((response) => {
            if (!response.ok) {
              // console.log(response.json())
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((result) => {
            // console.log(result)
            return {
              data: result,
              totalCount: result.length,
            };
          })
          .catch((error) => {
            console.error("There was a problem fetching data:", error);
          });
      },
      insert: function (values) {
        values.projet_id = id;
        const requestOptions = {
          method: "POST",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const url = "http://127.0.0.1:8000/api/utilisation";

        return fetch(API_URL + "/utilisation",requestOptions)
          .then((response) => {
            console.log(values);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
            return response.json();
          })
          .catch((error) => {
            console.error("There was a problem adding the data:", error);
          });
      },
      update: function (key, values) {
        const requestOptions = {
          method: "PUT",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const url = `http://127.0.0.1:8000/api/utilisation/${key.id}`;
        // console.log(key)
        return fetch(API_URL + "/utilisation/" + key.id,requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
            return response.json();
          })
          .catch((error) => {
            console.error("There was a problem updating the data:", error);
          });
      },
      remove: function (key) {
        const requestOptions = {
          method: "DELETE",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
        };
        const url = `http://127.0.0.1:8000/api/utilisation/${key.id}`;

        return fetch(API_URL + "/utilisation/" + key.id, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
          })
          .catch((error) => {
            console.error("There was a problem deleting the data:", error);
          });
      },
    }),
  });

  const dataPaiement = new DataSource({
    store: new CustomStore({
      load: function (options) {
        const requestOptions = {
          method: "GET",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
        };

        const url = `http://127.0.0.1:8000/api/paiement/getByProjetId/${id}`;

        return fetch(API_URL + "/paiement/getByProjetId/" + id, {
          method: "GET",
          reqHeaders,
          credentials:'include',
            })
          .then((response) => {
            if (!response.ok) {
              // console.log(response.json())
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((result) => {
            // console.log(result)
            return {
              data: result,
              totalCount: result.length,
            };
          })
          .catch((error) => {
            console.error("There was a problem fetching data:", error);
          });
      },
      insert: function (values) {
        values.projet_id = id;
        const requestOptions = {
          method: "POST",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const url = "http://127.0.0.1:8000/api/paiement";

        return fetch(API_URL + "/paiement", requestOptions)
          .then((response) => {
            console.log(values);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
            return response.json();
          })
          .catch((error) => {
            console.error("There was a problem adding the data:", error);
          });
      },
      update: function (key, values) {
        const requestOptions = {
          method: "PUT",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const url = `http://127.0.0.1:8000/api/paiement/${key.id}`;
        // console.log(key)
        return fetch(API_URL + "/paiement/" + key.id, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
            return response.json();
          })
          .catch((error) => {
            console.error("There was a problem updating the data:", error);
          });
      },
      remove: function (key) {
        const requestOptions = {
          method: "DELETE",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
        };
        const url = `http://127.0.0.1:8000/api/paiement/${key.id}`;

        return fetch(API_URL + "/paiement/" + key.id, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
          })
          .catch((error) => {
            console.error("There was a problem deleting the data:", error);
          });
      },
    }),
  });

  const dataWorker = new DataSource({
    store: new CustomStore({
      load: function (options) {
        const requestOptions = {
          method: "GET",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
        };

        const url = `http://127.0.0.1:8000/api/workerProjet/getByProjetId/${id}`;

        return fetch(
          API_URL + "/workerProjet/getByProjetId/" + id,requestOptions)
          .then((response) => {
            if (!response.ok) {
              // console.log(response.json())
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((result) => {
            // console.log(result)
            return {
              data: result,
              totalCount: result.length,
            };
          })
          .catch((error) => {
            console.error("There was a problem fetching data:", error);
          });
      },
      insert: function (values) {
        values.projet_id = id;
        const requestOptions = {
          method: "POST",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const url = "http://127.0.0.1:8000/api/workerProjet";

        return fetch(API_URL + "/workerProjet", requestOptions)
          .then((response) => {
            console.log(values);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
            return response.json();
          })
          .catch((error) => {
            console.error("There was a problem adding the data:", error);
          });
      },
      update: function (key, values) {
        const requestOptions = {
          method: "PUT",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const url = `http://127.0.0.1:8000/api/workerProjet/${key.id}`;
        // console.log(key)
        return fetch(API_URL + "/workerProjet/" + key.id, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
            return response.json();
          })
          .catch((error) => {
            console.error("There was a problem updating the data:", error);
          });
      },
      remove: function (key) {
        const requestOptions = {
          method: "DELETE",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
        };
        const url = `http://127.0.0.1:8000/api/workerProjet/${key.id}`;

        return fetch(API_URL + "/workerProjet/" + key.id, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
          })
          .catch((error) => {
            console.error("There was a problem deleting the data:", error);
          });
      },
    }),
  });

  const dataMateriel = new DataSource({
    store: new CustomStore({
      load: function (options) {
        const requestOptions = {
          method: "GET",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
        };

        const url = `http://127.0.0.1:8000/api/materielProjet/getByProjetId/${id}`;

        return fetch(
          API_URL + "/materielProjet/getByProjetId/" + id, requestOptions)
          .then((response) => {
            if (!response.ok) {
              // console.log(response.json())
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((result) => {
            // console.log(result)
            return {
              data: result,
              totalCount: result.length,
            };
          })
          .catch((error) => {
            console.error("There was a problem fetching data:", error);
          });
      },
      insert: function (values) {
        values.projet_id = id;
        const requestOptions = {
          method: "POST",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const url = "http://127.0.0.1:8000/api/materielProjet";

        return fetch(API_URL + "/materielProjet", requestOptions)
          .then((response) => {
            console.log(values);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
            return response.json();
          })
          .catch((error) => {
            console.error("There was a problem adding the data:", error);
          });
      },
      update: function (key, values) {
        const requestOptions = {
          method: "PUT",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };
        const url = `http://127.0.0.1:8000/api/materielProjet/${key.id}`;
        // console.log(key)
        return fetch(API_URL + "/materielProjet/" + key.id, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
            return response.json();
          })
          .catch((error) => {
            console.error("There was a problem updating the data:", error);
          });
      },
      remove: function (key) {
        const requestOptions = {
          method: "DELETE",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
        };
        const url = `http://127.0.0.1:8000/api/materielProjet/${key.id}`;

        return fetch(API_URL + "/materielProjet/" + key.id, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            getProjet();
          })
          .catch((error) => {
            console.error("There was a problem deleting the data:", error);
          });
      },
    }),
  });

  const handleFormSubmit = async (values) => {
    await fetch(API_URL + "/projet/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "Accept": "application/json",
      },
      credentials:'include',
      body: JSON.stringify(values),
    })
      .then((response) => {
        // handle response
        console.log(response);
        // navigate("/gestion de societe");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  let initialValues = {
    name: editContent.name,
    addresse: editContent.addresse,
    numEmployes: editContent.numEmployes,
  };

  useEffect(() => {
    getProjet();
    getArticles();
    getClients();
    getMateriels();
    getWorkers();
    // console.log(dataUtlisation);
    // console.log(email);
    // initialValues.name = name;
    // console.log(initialValues);
  }, [name]);

  return (
    <Box m="20px">
      <Header title="GESTION D'UN PROJET" subtitle="" />

      <Grid container spacing={2}>
        <Grid key="0" xs={12} sm={12} md={12} lg={12}>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            BALANCE: {editContent.balance} DH
          </Typography>
        </Grid>
        <Grid key="1" xs={12} sm={12} md={6} lg={6}>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            ENTREPOT
          </Typography>
          <DataGrid
            height={440}
            dataSource={dataUtlisation}
            allowColumnResizing={true}
            allowColumnReordering={true}
            columnAutoWidth={true}
            className="mui-data-grid"
            showBorders={false}
            rowAlternationEnabled={true}
            columnHidingEnabled={true}
          >
            <Editing
              mode="batch"
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true}
              useIcons={true}
            />
            <HeaderFilter visible={true} />
            <Scrolling mode="infinit" />
            <Column
              maxWidth={100}
              dataField="invoice_num"
              caption="N°"
              // groupIndex={0}
            />
            <Column dataField="entrepot_id" caption="L'article" width={125}>
              <Lookup dataSource={articles} valueExpr="id" displayExpr="name" />
            </Column>
            <Column maxWidth={100} dataField="projet_id" visible={false} />
            <Column width={100} dataField="quantity" />
            <Column maxWidth={100} dataField="prix_total" />
            <Column
              caption="Action"
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
        </Grid>
        <Grid key="2" xs={12} sm={12} md={6} lg={6}>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            PAIEMENTS
          </Typography>
          {/* columnHidingEnabled={true} */}
          {/* <Paging defaultPageSize={10} /> */}
          {/* <Pager
                    showInfo={true}
                    showNavigationButtons={true}
                /> */}
          {/* <SearchPanel
                    visible = {true}
                /> */}
          <DataGrid
            height={440}
            dataSource={dataPaiement}
            allowColumnResizing={true}
            allowColumnReordering={true}
            columnAutoWidth={true}
            className="mui-data-grid"
            showBorders={false}
            rowAlternationEnabled={true}
            columnHidingEnabled={true}
          >
            <Editing
              mode="batch"
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true}
              useIcons={true}
            />
            <HeaderFilter visible={true} />
            <Column maxWidth={100} dataField="objet" caption="Description" />
            {/* <Column maxWidth={100} dataField="client.name" caption="Client"/> */}
            <Column dataField="client_id" caption="Le client" width={125}>
              <Lookup dataSource={clients} valueExpr="id" displayExpr="name" />
            </Column>
            <Column maxWidth={100} dataField="status" />
            <Column maxWidth={100} dataField="somme" />
            <Column
              caption="Action"
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
        </Grid>
        <Grid key="3" xs={12} sm={12} md={6} lg={6}>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            OUVRIERS
          </Typography>
          {/* columnHidingEnabled={true} */}
          {/* <Paging defaultPageSize={10} /> */}
          {/* <Pager
                    showInfo={true}
                    showNavigationButtons={true}
                /> */}
          {/* <SearchPanel
                    visible = {true}
                /> */}
          <DataGrid
            height={440}
            dataSource={dataWorker}
            allowColumnResizing={true}
            allowColumnReordering={true}
            columnAutoWidth={true}
            className="mui-data-grid"
            showBorders={false}
            rowAlternationEnabled={true}
            columnHidingEnabled={true}
          >
            <Editing
              mode="batch"
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true}
              useIcons={true}
            />
            <HeaderFilter visible={true} />
            {/* <Column maxWidth={100} dataField="objet" caption="Description" /> */}
            {/* <Column maxWidth={100} dataField="client.name" caption="Client"/> */}
            <Column dataField="worker_id" caption="Type" width={125}>
              <Lookup dataSource={workers} valueExpr="id" displayExpr="title" />
            </Column>
            <Column maxWidth={100} dataField="hours" />
            <Column maxWidth={100} dataField="somme" />
            <Column
              caption="Action"
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
        </Grid>
        <Grid key="4" xs={12} sm={12} md={6} lg={6}>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            MATERIELS
          </Typography>
          {/* columnHidingEnabled={true} */}
          {/* <Paging defaultPageSize={10} /> */}
          {/* <Pager
                    showInfo={true}
                    showNavigationButtons={true}
                /> */}
          {/* <SearchPanel
                    visible = {true}
                /> */}
          <DataGrid
            height={440}
            dataSource={dataMateriel}
            allowColumnResizing={true}
            allowColumnReordering={true}
            columnAutoWidth={true}
            className="mui-data-grid"
            showBorders={false}
            rowAlternationEnabled={true}
            columnHidingEnabled={true}
          >
            <Editing
              mode="batch"
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true}
              useIcons={true}
            />
            <HeaderFilter visible={true} />
            {/* <Column maxWidth={100} dataField="objet" caption="Description" /> */}
            {/* <Column maxWidth={100} dataField="client.name" caption="Client"/> */}
            <Column dataField="materiel_id" caption="Type" width={125}>
              <Lookup
                dataSource={materiels}
                valueExpr="id"
                displayExpr="title"
              />
            </Column>
            <Column maxWidth={100} dataField="hours" />
            <Column maxWidth={100} dataField="somme" />
            <Column
              caption="Action"
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
        </Grid>
        <Grid key="5" xs={12} sm={12} md={12} lg={12}>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Addresse"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.addresse || ""}
                    name="addresse"
                    error={!!touched.addresse && !!errors.addresse}
                    helperText={touched.addresse && errors.addresse}
                    sx={{ gridColumn: "span 4" }}
                  />
                  {/* <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Employes"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.numEmployes || ""}
                    name="numEmployes"
                    error={!!touched.numEmployes && !!errors.numEmployes}
                    helperText={touched.numEmployes && errors.numEmployes}
                    sx={{ gridColumn: "span 4" }}
                  /> */}
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    ENREGISTRER
                  </Button>
                  <ToastContainer />
                </Box>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string(),
  addresse: yup.string(),
  // capital: yup.number().required("required"),
  // RC: yup.string().required("required"),
  // ICE: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // phoneNumber: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // numEmployes: yup.string().required("required"),
});

export default EditProjet;
