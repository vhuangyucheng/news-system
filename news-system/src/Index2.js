import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Item from "antd/lib/list/Item";
import { Button, Input, Radio, Modal, Tree } from "antd";
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

  function plusValue() {
    setValue((prevValue) => {
      return 2;
    });
  }

  const [value, setValue] = useState(1);

  const showModal = () => {
    setTimeout(() => {
      setValue(2);
    }, 0);
    Modal.confirm({
      title: "Confirm",
      icon: null,
      content: value,
      okText: "确认",
      cancelText: "取消",
    });
  };


  const [count, setCount] = useState([
    {
      a: 1,
      b: 3,
    },
    { a: 2 },
  ]);
  const testFunction2 = (e) => {
    setCount(
      count.map((item) => {
        item.a = 4;
        return item;
      })
    );
  };

  return (
    <div>
      index2 gogo
      <Button onClick={testFunction2}>
        -----{count.map((item) => item.a)}
      </Button>
      <Button onClick={() => testFunction3(1)}>222 </Button>
      {/* <Button onClick={plusValue}>现在的value: {value}</Button> */}
      {/* <Input placeholder="Basic usage" onChange={() => testFunction3(2)} />
      <Input placeholder="Basic usage" onChange={testFunction3} /> */}
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
    </div>
  );
}
