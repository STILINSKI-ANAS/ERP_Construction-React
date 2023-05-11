import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Entrepot = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const getArticles = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/get_all_articles")
      .then(({ data }) => {
        console.log("data", data);
        setArticles(data.articles);
        setisLoading(false);
      });
  };

  const deleteArticle = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/Entrepot/${id}`)
      .then(({ data }) => {
        console.log(data);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      width: 100,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      headerAlign: "center",
      width:100
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "center",
      align: "center",
      flex:1
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "addresse",
      headerName: "Addresse",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ICE",
      headerName: "ICE",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "RC",
      headerName: "RC",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "capital",
      headerName: "Capital",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 75,
      disableClickEventBubbling: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const onClickDelete = (e) => {
          e.stopPropagation();
          const currentRow = params.row;
          deleteArticle(currentRow.id);
          getArticles();
          // toast(JSON.stringify(currentRow.id, null, 4));
        };
        const onClickEdit = (e) => {
          e.stopPropagation();
          const currentRow = params.row;
          navigate("/editEntrepot/" + currentRow.id);
        };

        return (
          <>
            <IconButton onClick={onClickEdit}>
              <EditOutlinedIcon sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton onClick={onClickDelete}>
              <DeleteOutlineOutlinedIcon sx={{ fontSize: "25px" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    console.log("First call on mount..");
    getArticles();
    return () => console.log("Cleanup..");
  }, []);

  return (
    <Box m="20px">
      <Header
        title="COMPANIES"
        subtitle="List of Articles for Future Reference"
        sx={{ gridColumn: "span 2" }}
      />
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Grid item>
          <Button
            onClick={() => {
            }}
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add
          </Button>
          <ToastContainer />
        </Grid>
      </Grid>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.secondary[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.secondary[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.secondary[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.secondary[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
        
      >
        {isLoading == true ? (
          <Box
            sx={{ display: "flex" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="75vh"
          >
            <CircularProgress color="success" />
          </Box>
        ) : (
          <DataGrid
            rows={articles}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            checkboxSelection={true}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            
          />
        )}
      </Box>
    </Box>
  );
};

export default Entrepot;
