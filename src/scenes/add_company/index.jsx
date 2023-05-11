import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Add_company = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    console.log(values);
    console.log(values.name);
    console.log(values.addresse);
    console.log(values.capital);
    console.log(values.RC);
    console.log(values.ICE);
    console.log(values.description);
    console.log(values.email);
    console.log(values.phoneNumber);

    await axios
      .post("http://127.0.0.1:8000/api/company", values)
      .then(({ data }) => {
        console.log(data);
        navigate("/gestion de societe");
      })
      .catch(({ response }) => {});
  };

  return (
    <Box m="20px">
      <Header
        title="CRÉER UNE ENTREPRISE"
        subtitle="Créer un nouveau compte d'entreprise"
      />

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
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Capital"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.capital}
                name="capital"
                error={!!touched.capital && !!errors.capital}
                helperText={touched.capital && errors.capital}
                sx={{ gridColumn: "span 2" }}
              />
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
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="RC"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.RC}
                name="RC"
                error={!!touched.RC && !!errors.RC}
                helperText={touched.RC && errors.RC}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ICE"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ICE}
                name="ICE"
                error={!!touched.ICE && !!errors.ICE}
                helperText={touched.ICE && errors.ICE}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Addresse"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.addresse}
                name="addresse"
                error={!!touched.addresse && !!errors.addresse}
                helperText={touched.addresse && errors.addresse}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                créer une entreprise
              </Button>
              <ToastContainer />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  capital: yup.number().required("required"),
  RC: yup.string().required("required"),
  ICE: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  addresse: yup.string().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  name: "",
  capital: "",
  RC: "",
  ICE: "",
  email: "",
  phoneNumber: "",
  addresse: "",
  description: "",
};

export default Add_company;
