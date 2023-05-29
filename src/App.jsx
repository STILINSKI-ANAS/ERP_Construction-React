import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { Routes, Route  } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { useNavigate } from "react-router-dom";
// import Navbar from "./scenes/global/Navbar";
// import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Company from "./scenes/company";
import AddCompany from "./scenes/company/addCompany";
import EditCompany from "./scenes/company/editCompany";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
import Layout from "./scenes/layout";
import Entrepot from "./scenes/entrepot"
// import Geography from "./scenes/geography";
// import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/signup";
// import { setAuthToken } from "./setAuthToken";
import Projects from "./scenes/projects";
import EditProjet from "./scenes/projects/editProjet";
import 'devextreme/dist/css/dx.material.blue.light.css';
import Employees from "./scenes/employees";
import Clients from "./scenes/clients";
import Fournisseur from "./scenes/fournisseur";
import Materiel from "./scenes/materiel";
import Gdf from "./scenes/gdf";
// import './dx.material.dark.css';



function App() {
    const [theme, colorMode] = useMode();
    const [role, setRole] = useState([]);
    const [content, setContent] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const navigate = useNavigate();
  const API_URL = "https://api.tourtit-travaux.com/api";
  // const API_URL = "http://localhost/ERP_Construction_Api/public/api";

    
    const getdata = async () =>{
        const response = await fetch(API_URL + "/user",{
        headers:{'Content-Type': 'application/json'},
        credentials:'include',
          },[])
        const contenttemp = await response.json();
        setContent(contenttemp);
        setisLoading(false);
        console.log(contenttemp);
    };

    const login = async (email, password) => {
        const response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          })
            const content = await response.json();
            console.log(content);
            getdata();
    };

    const logout = async ()=>{
        await  fetch(API_URL + '/logout',{
          method:'POST',
          headers:{'Content-Type': 'application/json', 'X-Requested-With':'XMLHttpRequest'},
          credentials:'include',
            })
            setContent([]);
            console.log('logout......')
            console.log(content)
            setisLoading(true);
            getdata()
            navigate("/signIn");
            // window.location.reload();
    };

    const signUp = async (values)=>{

        await axios.post(API_URL + "/register",values).then(({data})=>{
            console.log(data);
        })
        .catch(({response})=>{

        })
        getdata()
    }

      useEffect(() => {
        //Runs on every render
        console.log("First call on mount..");
        getdata();
      }, []);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <main className="content">
                            <Routes>
                                <Route element={<Layout logout={logout} login={login} user={content} isLoading={isLoading}/>}> 
                                    <Route path="/" element={<Dashboard user={content} isLoading={isLoading}/>} />
                                    <Route path="/signin" element={<SignIn login={login} user={content}/>} />
                                    <Route path="/signup" element={<SignUp SignUp={signUp} user={content}/>} />
                                    <Route path="/dashboard" element={<Dashboard user={content}/>} />
                                    <Route path="/gestion de societe" element={<Company user={content}/>} />
                                    <Route path="/addCompany" element={<AddCompany user={content}/>} />
                                    <Route path="/editCompany/:id" element={<EditCompany user={content}/>} />
                                    <Route path="/gestion de projets" element={<Projects user={content}/>} />
                                    <Route path="/editProjet/:id" element={<EditProjet user={content}/>} />
                                    <Route path="/gestion d'Entrepot" element={<Entrepot user={content}/>} />
                                    <Route path="/gestion d'employees" element={<Employees user={content}/>} />
                                    <Route path="/gestion de clients" element={<Clients user={content}/>} />
                                    <Route path="/gestion de fournisseur" element={<Fournisseur user={content}/>} />
                                    <Route path="/gestion de commandes" element={"not found"} />
                                    <Route path="/generateur de devis" element={<Gdf user={content}/>} />
                                    <Route path="/gestion de materiels" element={<Materiel user={content}/>} />
                                    <Route path="/gestion de payements" element={"not found"} />
                                    <Route path="/admin" element={"not found"} />
                                    <Route path="/performance" element={"not found"} />
                                    <Route path="/*" element={"not found"} />
                                </Route>
                            </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );

}

export default App 