import { useState } from "react"
import { useEffect } from "react"
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function Appbar(){
    const navigate = useNavigate()
    const[userEmail,setUserEmail] = useState(null)
    
    useEffect(()=> {
  
          
    },[]);
    function callback2(data){
        if(data.username){
            setUserEmail(data.username)
        }
    }
    function callback1(res){
        res.json().then(callback2)
    }
    fetch("http://localhost:3002/admin/me  ", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
      }).then(callback1) 
    if(userEmail){
        return(
            <div>
            <AppBar  position="static">
                <div style={{display:"flex",justifyContent: "space-between",paddingLeft:20,paddingRight:20}}>
                    <div>
                    <Typography variant={"h6"}>FreeWebDevCourse.org</Typography>
                    </div>
                    <div style={{display:"flex",justifyContent: "space-between",paddingLeft:10,paddingRight:10}}>
                    <div>
                        {"userID-->(" + userEmail +")"  }
                    </div>
                    
                    <div>
                    <Button variant="contained" color="success"
                    onClick={()=>{
                        localStorage.setItem("token",undefined)
                        window.location="/"
                }
                    
                }
                    >LOGOUT</Button>
                    <Button variant="contained" color="success"
                    onClick={()=>{
                        
                        window.location="/addcourses"
                }
                    
                }
                    >Add Couses</Button>
                    </div>
                    </div>
                

                </div>
            
            </AppBar>
            
            
        </div>
        )
    }
    else{
        <div>
            Loading....
        </div>
    }
    return(
        <div>
            <AppBar  position="static">
                <div style={{display:"flex",justifyContent: "space-between",paddingLeft:20,paddingRight:20}}>
                    <div>
                    <Typography variant={"h6"}>FreeWebDevCourse.org</Typography>
                    </div>
                    <div>
                    <Button variant="contained" color="success"
                    onClick={()=>{navigate("/signup")}}
                    >SIGNUP</Button>
                    <Button variant="contained" color="success"
                    onClick={()=>{navigate("/signin")}}
                    >SIGNIN</Button>
                    </div>
                

                </div>
            
            </AppBar>
            
            
        </div>
    )




}


export default Appbar