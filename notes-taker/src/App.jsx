import './App.css';
import { Navbar } from './Components/Navbar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './Components/Home';
import { About } from './Components/About';
import NoteState from './Context/notes/noteState';
import { Notes } from './Components/Notes';
import { Alert } from './Components/Alert';
import { SignUp } from './Components/SignUp';
import { Login } from './Components/Login';
import { useState } from 'react';



function App() {

  const [alertinfo, setalertinfo] = useState({message:"",type:""})
  const showAlert = (message, type)=>{
    setalertinfo({
      message: message,
      type: type
    })
    setTimeout(() => {
        setalertinfo({message:"",type:""});
    }, 1800);
}

  return (
    <div className=''>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message={alertinfo.message} type={alertinfo.type} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/notes" element={<Notes showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
