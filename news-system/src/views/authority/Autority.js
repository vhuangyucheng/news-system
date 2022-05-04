import React, { useState, useEffect } from "react";
import { Button, Table, Tag,Modal } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditFilled,
  ExclamationCircleOutlined
} from "@ant-design/icons";

export default function Autority() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3004/rights?_embed=children").then((res) => {
      setDataSource(res.data);
    });
  }, []);

  // const dataSource = [
  //   {
  //     key: '1',
  //     name: '胡彦斌',
  //     age: 32,
  //     address: '西湖区湖底公园1号',
  //   },
  //   {
  //     key: '2',
  //     name: '胡彦祖',
  //     age: 42,
  //     address: '西湖区湖底公园1号',
  //   },
  // ];
  const deleteItem =(key)=>{
    console.log(key);
  }
  const deleteConfirm =(key)=>{
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'confirm to delete?',
      okText: '确认',
      cancelText: '取消',
      onOk: ()=>deleteItem(key)
    });
  }
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "权限名称authority",
      dataIndex: "title",
      key: "id",
    },
    {
      title: "权限路径authorityUrl",
      dataIndex: "key",
      key: "id",
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
      },
    },
    {
      title: "操作operation",
      render: (key) => {
        return (
          <div>
               <Button type="primary" icon={<EditFilled />} shape="circle">
            
            </Button>
            <Button  danger icon={<DeleteOutlined />} shape="circle" onClick={()=>deleteConfirm(key)}>
            
            </Button>
            
            <Button type="primary" shape="circle">
              A
            </Button>
          </div>
        );
      },
    },
  ];
  return <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}}/>;
 
}
