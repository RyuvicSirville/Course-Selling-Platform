import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import Appbar from "./Appbar.jsx";
import CoursesGet from './CoursesGet.jsx';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { purple } from '@mui/material/colors';
import Card from '@mui/material/Card';
import Courses from "./Courses.jsx";
import EditCourses from "./EditCourses.jsx";
import { Typography } from '@mui/material';
import Homepage from "./Homepage.jsx";

function App() {
  return (
    <div  >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{
          width: "500vw",
          height: "500vh",
          backgroundColor: "#eeeeee",

        }}
        >
          <center><h1 style={{ margin: 10 }}>R.S</h1></center>
          <Router>
            <Appbar />
            <Routes>
              <Route path={"/"} element={<Homepage />} />
              <Route path={"/courses"} element={<CoursesGet />} />
              <Route path={"/editcourses"} element={<EditCourses />} />
              <Route path={"/addcourses"} element={<Courses />} />
              <Route path={"/signup"} element={<SignUp />} />
              <Route path={"/signin"} element={<SignIn />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>



  )
}

export default App
