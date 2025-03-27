import React from "react";
import { useState } from "react"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import {useNavigate} from "react-router-dom";
import  {returnElem } from './CoursesGet.jsx';
import { useParams } from "react-router-dom";
import {useEffect} from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
var t,d,im;   
function EditCourses(){
  
  const [title,callTitle]= useState("")
  const [description,callDescription]= useState("")
  const [image,callImage]= useState("")
  const navigate = useNavigate()
  //callTitle(returnElem().title);
  
  return(
    <RecoilRoot>
    <div style={{display:"flex",flexWrap:"wrap"}}> 
    <div style={{height:"25%",width:"100",margin:"auto"}}>
    {returnElem().title}
    
    <br/>
    {returnElem().description}
    
    <center>
      <div style={{
                paddingTop:150}}>
      <Card variant="outlined"
        style={{width:"50vw",
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
          defaultValue={returnElem().title}
          
        />
        {console.log("vvv"+title +"vvv")}
        <br/><br/>
        <TextField
          
          onChange={(e)=>{
            callDescription(e.target.value)
            
          }}
 
          fullWidth="true"
          id="outlined-basic" 
          label="Description"
          variant="outlined"
          defaultValue={returnElem().description}
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
          defaultValue={returnElem().image}
        />
        <br/><br/>
        <Button variant="contained" color="success"
          onClick={ () =>{
             t=title,d=description,im=image;
            if(title==""){t=returnElem().title}
            if(description==""){d=returnElem().description}
            if(image==""){im=returnElem().image}
            function callback2(data) {
              alert("Course edited")
              navigate("/courses")
          }
          function callback1(res) {
              res.json().then(callback2)
          }
          fetch("http://localhost:3000/admin/courses/", {
              
              method: "PUT",
              body: JSON.stringify({
          
                  title: t,
                  image:im,
                  id:returnElem().id,
                  description: d
              }),
              headers: {
                  "Content-type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
                  
              }
              
          })
          .then(callback1);
            
          
          }}
        >Save</Button> 
               
        <br/><br/>
        </Card>
      </div>
      
      </center>
      </div>
      <img style={{height:"25%",width:"25%"}} src={returnElem().image}></img>
      </div>
      </RecoilRoot>

 )
};

const useTitle = atom({
  key: 'textState1', 
  default: returnElem().title, 
});
const useDescription = atom({
  key: 'textState2', 
  default: returnElem().description, 
});
const useImage = atom({
  key: 'textState3', 
  default: returnElem().image, 
});

export default EditCourses;