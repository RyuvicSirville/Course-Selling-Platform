import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { useState } from "react"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Courses(){
  const [title,callTitle]= useState("")
  const [description,callDescription]= useState("")
  const [image,callImage]= useState("")
  const navigate = useNavigate()
 return(
    <>
    {title}
    <br/>
    {description}
    <center>
      <div style={{
                paddingTop:150}}>
      <Card variant="outlined"
        style={{width:"60vw",
            padding:50}}
        >
  
  
        <TextField 
          onChange={(e)=>{
            callTitle(e.target.value)
          }}

          fullWidth="true"
          id="outlined-basic" 
          label="Title"
          variant="outlined"
        />
        <br/><br/>
        <TextField
          onChange={(e)=>{
            callDescription(e.target.value)
          }}
 
          fullWidth="true"
          id="outlined-basic" 
          label="Description"
          variant="outlined"
        />
        <br/><br/>
        <TextField
          onChange={(e)=>{
            callImage(e.target.value)
          }}
 
          fullWidth="true"
          id="outlined-basic" 
          label="Image link"
          variant="outlined"
        />
        <br/><br/>
        <Button variant="contained" color="success"
          onClick={ () =>{
            function callback2(data) {
              alert("Course added")
              window.location ="/courses"
          }
          function callback1(res) {
              res.json().then(callback2)
          }
          fetch("http://localhost:3002/admin/courses", {
              method: "POST",
              body: JSON.stringify({
                  title: title,
                  image:image,
                  description: description
              }),
              headers: {
                  "Content-type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
                  
              }
              
          })
          .then(callback1)
          
          }}
        >Save</Button> 
        <br/><br/>
        </Card>
      </div>
      
      </center>
      </>
 )
};

export default Courses;