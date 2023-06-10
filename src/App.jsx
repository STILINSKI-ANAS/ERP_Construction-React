import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { Routes, Route  } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { useNavigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";
import Entrepot from "./scenes/entrepot"
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./scenes/projects";
import EditProjet from "./scenes/projects/editProjet";
import 'devextreme/dist/css/dx.material.blue.light.css';
import Ouvriers from "./scenes/ouvriers";
import Clients from "./scenes/clients";
import Fournisseur from "./scenes/fournisseur";
import Materiel from "./scenes/materiel";
import Gdf from "./scenes/gdf";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [theme, colorMode] = useMode();
    const [role, setRole] = useState([]);
    const [content, setContent] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const navigate = useNavigate();
    const [statusLog, setStatusLog] = useState(200);
  const API_URL = "https://api.tourtit-travaux.com/api";
  // const API_URL = "http://localhost/ERP_Construction_Api/public/api";

    const getdata = async () =>{
        const response = await fetch(API_URL + "/user",{
        headers:{'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
        credentials:'include',
          },[])
          if(response.status == 200){
            const contenttemp = await response.json();
            setContent(contenttemp);
          }
        setStatusLog(response.status);
        setisLoading(false);
        // console.log(response.status);
    };

    const toasting = ()=>{
      toast.error('Non Valide');
    }
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
            console.log(response);
            if(response.status != 200){
              toasting()
            }
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
                                <Route element={<Layout logout={logout} login={login} user={content} isLoading={isLoading} statusLog={statusLog}/>}> 
                                    <Route path="/" element={<Dashboard user={content} isLoading={isLoading} statusLog={statusLog}/>} />
                                    <Route path="/signin" element={<SignIn login={login} user={content} statusLog={statusLog}/>} />
                                    <Route path="/signup" element={<SignUp SignUp={signUp} user={content} statusLog={statusLog}/>} />
                                    <Route path="/dashboard" element={<Dashboard user={content} statusLog={statusLog}/>} />
                                    <Route path="/gestion de projets" element={<Projects user={content} statusLog={statusLog}/>} />
                                    <Route path="/editProjet/:id" element={<EditProjet user={content} statusLog={statusLog}/>} />
                                    <Route path="/gestion d'Entrepot" element={<Entrepot user={content} statusLog={statusLog}/>} />
                                    <Route path="/gestion d'Ouvriers" element={<Ouvriers user={content} statusLog={statusLog}/>} />
                                    <Route path="/gestion de clients" element={<Clients user={content} statusLog={statusLog}/>} />
                                    <Route path="/gestion de fournisseur" element={<Fournisseur user={content} statusLog={statusLog}/>} />
                                    <Route path="/gestion de commandes" element={"not found"} />
                                    <Route path="/generateur de devis" element={<Gdf user={content} statusLog={statusLog}/>} />
                                    <Route path="/Gestion de Matériel de Location" element={<Materiel user={content} statusLog={statusLog}/>} />
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