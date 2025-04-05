import { useState } from "react"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Courses from "./Courses.jsx";
import {useNavigate} from "react-router-dom";


function SignIn(){
  const [email,callEmail]= useState("")
  const [password,callPassword]= useState("")
  const navigate = useNavigate()
 return(
    <>
    {email}
    <br/>
    {password }
    <center>
      <div style={{
                paddingTop:150}}>
      <Card variant="outlined"
        style={{width:"60vw",
            padding:50}}
        >
  
  
        <TextField 
          onChange={(e)=>{
            callEmail(e.target.value)
          }}

          fullWidth="true"
          id="outlined-basic" 
          label="Username"
          variant="outlined"
        />
        <br/><br/>
        <TextField
          onChange={(e)=>{
            callPassword(e.target.value)
          }}
 
          fullWidth="true"
          id="outlined-basic" 
          label="Password"
          variant="outlined"
          type="password"
        />
        <br/><br/>
        <Button variant="contained" color="success"
          onClick={()=>{
            function callback2(data) {
              localStorage.setItem("token", data.token);
              console.log(localStorage.getItem("token"))
              let x =localStorage.getItem("token")
              if(x !== "undefined"){
                navigate1()
              }
              else{
                alert("Autherisation Failed!")
              }
              function navigate1(){
                navigate("/courses")
              }
              
          }
          function callback1(res) {
              res.json().then(callback2)
          }
          fetch("http://localhost:3002/admin/login  ", {
              method: "POST",
              body: JSON.stringify({
                  username: email,
                  password: password
              }),
              headers: {
                  "Content-type": "application/json"
              }
          })
          .then(callback1)
          }}
        >SIGNIN</Button> 
        <br/><br/>
        </Card>
      </div>
      
      </center>
      </>
 )
};

export default SignIn;