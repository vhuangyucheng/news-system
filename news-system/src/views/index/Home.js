import React,{useEffect} from 'react';
import {Button} from 'antd';
import axios from 'axios';

export default function Home() {
  // const getData= ()=>{
  //   axios.get("http://localhost:3004/comments").then(res=>{
  //     console.log(res);
  //   })
  //   axios.post("http://localhost:3004/comments",{
  //     body:"test",
  //     postId:1
  //   })
  //   axios.put("http://localhost:3004/comments/3",{
  //     body:"test3",
  //     postId:3
  //   })
  //   axios.patch("http://localhost:3004/comments/2",{
     
  //     postId:2
  //   })
  //   axios.delete("http://localhost:3004/comments/5")
  //    axios.get("http://localhost:3004/posts?_embed=comments").then(res=>{
  //     console.log(res);
  //   })
  //   //注意这个post的单写
  //   axios.get("http://localhost:3004/comments?_expand=post").then(res=>{
  //     console.log(res);
  //   })
  //   console.log("dddddd");
  // }

  useEffect(()=>{
    // axios.get("http://localhost:3004/rights?_embed=children").then((res)=>{
    //   console.log(res);
    //   setMenu(res.data);
    // })
    // console.log("home goo");
  },[])
  return (
    <div>Home
        <Button type="primary">Button</Button>
    </div>
  )
}
