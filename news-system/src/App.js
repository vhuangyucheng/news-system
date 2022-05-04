import React,{useEffect} from "react";
import IndexRouter from "./router/IndexRouter";



function App() {
  useEffect(()=>{
    // axios.get("http://localhost:3004/rights?_embed=children").then((res)=>{
    //   console.log(res);
    //   setMenu(res.data);
    // })
    // console.log("app");
  },[])
 
  return (
   
      

      <IndexRouter>
        
      </IndexRouter>
    
  );
}

export default App;
