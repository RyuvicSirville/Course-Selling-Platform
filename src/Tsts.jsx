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
 let t=returnElem().title,d=returnElem().description,im=returnElem().image;
 function EditCourses(){
  
  const [title, setTitle] = useRecoilState(titleState);
  const [description,setDescription]= useRecoilState(descriptionState)
  const [image,setImage]= useRecoilState(imageState)
  
  
  return(
    <RecoilRoot>
      <abcd></abcd>
    
      </RecoilRoot>

 )
};

/* export function button(){
  const navigate = useNavigate()
    const [title,callTitle]= useRecoilState(useTitle)
    const [description,callDescription]= useRecoilState(useDescription)
    const [image,callImage]= useRecoilState(useImage)
    return(
      
        <div>
        <Button variant="contained" color="success"
          onClick={ () =>{
             
            callTitle((e)=>{if(e==""){callTitle(t)}} )
            callDescription((e)=>{if(e==""){callDescription(d)}} )
            callImage((e)=>{if(e==""){callImage(returnElem().im)}} )
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
          
                  title: title,
                  image:image,
                  id:returnElem().id,
                  description: description
              }),
              headers: {
                  "Content-type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
                  
              }
              
          })
          .then(callback1);
            
          
          }}
        >Save</Button>
        </div>
       
        
    )
} */
export function abcd(){
  const [title, setTitle] = useRecoilState(titleState);
  const [description,setDescription]= useRecoilState(descriptionState)
  const [image,setImage]= useRecoilState(imageState)
  return(
  <div style={{display:"flex",flexWrap:"wrap"}}> 
    <div style={{height:"25%",width:"100",margin:"auto"}}>
    
    
    <br/>
    
    
    <center>
      <div style={{
                paddingTop:150}}>
      <Card variant="outlined"
        style={{width:"50vw",
            padding:50}}
        >
  
      
        <TextField 
        
          onChange={(e)=>{
            
            
            setTitle(e.target.value)
            
          }}

          fullWidth="true"
          id="outlined-basic" 
          label="Title"
          variant="outlined"
          defaultValue={returnElem().title}
          
        />
        
        <br/><br/>
        <TextField
          
          onChange={(e)=>{
            setDescription(e.target.value)
            
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
            setImage(e.target.value)
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
             
            setTitle((e)=>{if(e==""){t}} )
            setDescription((e)=>{if(e==""){d}} )
            setImage((e)=>{if(e==""){im}} )
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
          
                  title: title,
                  image:image,
                  id:returnElem().id,
                  description: description
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
  )
}

export default EditCourses;

const titleState = atom({
  key: 'useTitle', 
  default: returnElem().title, 
});
const descriptionState = atom({
  key: 'useDescription', 
  default: returnElem().description, 
});
const imageState = atom({
  key: 'useImage', 
  default: returnElem().image, 
});