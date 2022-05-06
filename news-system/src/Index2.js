import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Item from "antd/lib/list/Item";
import { Button, Input, Radio, Modal,Tree } from "antd";
import "antd/dist/antd.css";

export default function Index2() {
  const [menu, setMenu] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3004/rights?_embed=children").then((res) => {
      // console.log(res.data);
      setMenu(res.data);
      // console.log(menu);
    });
  }, []);

  const testFunction = (e) => {
    // let list = menu.map(item=>{
    //   if(item.id === 2){
    //     item.children = item.children.filter(item=>item.id !== 1)
    //   }
    // })
    // console.log(menu);
    // setMenu(menu)
  };

  const testFunction3 = (event, id) => {
    console.log(event);
  };

  const testFunction4 = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [count, setCount] = useState({
    b: 1,
    c: 2,
    d: { a: 1, b: [1, 2, 3] },
  });
 

  const testFunction2 = (e) => {
    // const test = count
    const test = { ...count };
    // const test =  JSON.parse(JSON.stringify(count));
    // console.log(test);
    count.b = 2;
    // count.d.b = count.d.b.filter(item=>item!==3)
    count.d.a = 3;
    // console.log(count)
    setCount(test);
    // setCount({...test})
  };

  const [value, setValue] = useState(1);
  const showModal = () => {
   
    setValue(2)
    Modal.confirm({
      title: 'Confirm',
      icon: null,
      content:value,
      okText: '确认',
      cancelText: '取消',
    });
  };



  
  return (
    <div>
      index2 gogo
      <Button onClick={testFunction3}>aa</Button>
      <Button onClick={() => testFunction3(1)}>aa</Button>
      <Button onClick={testFunction2}>
        {count.b} ---- {count.d.a}
      </Button>
      <Input placeholder="Basic usage" onChange={() => testFunction3(2)} />
      <Input placeholder="Basic usage" onChange={testFunction3} />
     
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
   
    </div>
  );
}
