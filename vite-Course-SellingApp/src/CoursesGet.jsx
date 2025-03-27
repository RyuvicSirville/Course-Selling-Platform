import React from "react";
import { useState } from "react"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

let id,Title,Description,Image;

function CoursesGet(){
    const[id,setid] = useState([])
    const[allData,setallData] = useState([])
    useEffect(()=> {
        function callback2(data){
            //console.log(data.courses)
            setallData(data.courses)
            //console.log(data.courses[0].id)
        }
        function callback1(res){
            res.json().then(callback2)
        }
        fetch("http://localhost:3002/admin/courses  ",{
            method:"GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
              }
        }).then(callback1)
          
    },[]);
  
return(
    <div style={{display:"flex",flexWrap:"wrap"}}>
        
        {allData.map(course => {
            return<LoopAllData  course={course}/>
        })}
        
    </div>
    
)
}

export function LoopAllData(props){
    const navigate = useNavigate()
    return(
        <>
        <div style={{display: "flex"}}>
        
          <div style={{display: "flex",
                    paddingTop:30}}>
          <Card variant="outlined"
            style={{width:"20vw",height:"45vh",
                padding:20}}
            >
                
           
           <Typography>TITLE:{props.course.title}</Typography>
            <br/>
            <Typography>DESCRIPTION:{props.course.description}</Typography>
            <br/>
            <img style={{height:"200px",width:"100%",margin:"auto"}} src={props.course.image}></img>
            <br/>
            <Button variant="contained" color="success"
              onClick={ () =>{
                {id=props.course._id}
                {console.log(typeof(id))}
                {Title=props.course.title}
                {Description=props.course.description}
                {Image=props.course.image}
                navigate("/editcourses")
                }}
            >Edit</Button> 
            {' '}
            {' '}
            {' '}
            <Button variant="contained" color="success"
          onClick={ () =>{
            {id=(props.course._id)}
               
            function callback2(data) {
               
              
              window.location ="/courses"   
          }
          function callback1(res) {
              res.json().then(callback2)
          }
          fetch("http://localhost:3000/admin/delete", {
              method: "DELETE",
              body: JSON.stringify({
                title: props.course.title,
                image:props.course.image,
                id:props.course._id,
                description: props.course.description
              }),
              headers: {
                  "Content-type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
                  
              }
              
          })
          .then(callback1)
          
          }}
            >Delete</Button> 
            <br/><br/>
            </Card>
          </div>
          
          </div>
          </>
    )
}
export function returnId(){
    return id;
}
export function returnElem(){
 return ({
    "title":Title,
    "description": Description,
    "image":Image,
    "id":id,
 })
}
export default CoursesGet;