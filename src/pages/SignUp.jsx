import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { CenterFocusStrong } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



const SignUp = ({SignUp, user, statusLog}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  
  const handleFormSubmit = async (values) => {
    try {
      await SignUp(values).then(
        () => {
          // window.location.reload();
          navigate("/signin");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  if(statusLog == 200){
    console.log('INN...')
    return <Navigate to="/dashboard" />
  }else{
  return (
    <Box m="20px">
      <Header title="Signup" subtitle="Créer un nouveau compte d'entreprise" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                  p="15px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ boxShadow: 1 }}
                >
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                // sx={{ gridColumn: "span 12" }}
              />
            </Box>
            <Box
                  p="15px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ boxShadow: 1 }}
                >
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                // sx={{ gridColumn: "span 3" }}
              />
            </Box>
            <Box
                  p="15px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ boxShadow: 1 }}
                >
                <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                // sx={{ gridColumn: "span 3" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                type="submit" color="secondary" variant="contained"
              >
                <CheckCircleOutlineIcon sx={{ mr: "10px" }} />
                SignUp
              </Button>
              <ToastContainer />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );}
};

const checkoutSchema = yup.object().shape({
  name:yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  name:"",
  email: "",
  password: "",

};

export default SignUp;
