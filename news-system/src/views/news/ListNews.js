import React from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";



export default function ListNews() {
    let navigate = useNavigate();
    const test = ()=>{
        navigate("/home")
    }
  return (
    <div><Button onClick={test}> test </Button></div>
  )
}
