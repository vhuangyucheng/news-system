import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
export default function Index2() {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3004/rights?_embed=children").then((res) => {
      setMenu(res.data);
      // console.log(meun);
    });
    console.log("goo");
  }, []);


  const testFunction = (menu1) => {
    console.log(menu1);
    return menu1
  };

  
  return (
    <div>
      index2 gogo
      {testFunction(menu)} 
    </div>
  );
}
