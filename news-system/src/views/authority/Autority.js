import React, { useState, useEffect } from "react";
import { Button, Table, Tag, Popover, Modal, Switch } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function Autority() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3004/rights?_embed=children").then((res) => {
      const newDataSource = res.data;
      newDataSource.map((element) => {
        element.children =
          element.children.length === 0 ? "" : element.children;
      });

      setDataSource(newDataSource);
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
  const deleteItem = (key) => {
    // axios
    // console.log(key);
    if (key.grade === 1) {
      setDataSource(
        dataSource.filter((item) => {
          return item.id !== key.id;
        })
      );
    }
    if (key.grade === 2) {
      dataSource.map((item) => {
        if (item.id === key.rightId) {
          item.children = item.children.filter((item) => item.id !== key.id);
        }
      });

      // let list = menu.map(item=>{
      //   if(item.id === 2){
      //     item.children = item.children.filter(item=>item.id !== 1)
      //   }
      // })
      // console.log(dataSource);
      setDataSource([...dataSource]);
    }
  };
  const deleteConfirm = (key, record) => {
    // console.log(key);
    // console.log(record);
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "confirm to delete?",
      okText: "确认",
      cancelText: "取消",
      onOk: () => deleteItem(key),
    });
  };
  const onSwitch = (key) => {
    // console.log(key);
    key.pagepermission = key.pagepermission === 1?0:1;
    setDataSource([...dataSource])
  };
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
      render: (item) => {
        // console.log(item)
        return ( <Tag color="orange">{item}</Tag>);
      },
    },
    // {
    //   title: "id",
    //   render: (key, record) => {
    //     return <span>{key.pagepermission}</span>
    //   }
    // },
    {
      title: "操作operation",
      render: (key, record) => {
        return (
          <div>
            <Popover
              content={
                <div style={{textAlign:"center" }}>
                  <Switch checked={key.pagepermission} onChange={()=>onSwitch(key)} />
                </div>
              }
              title="Title"
              trigger={key.pagepermission===undefined?"":"click"}
              
            >
              <Button
                type="primary"
                icon={<EditFilled />}
                shape="circle"
                disabled={key.pagepermission===undefined}
              ></Button>
            </Popover>
            <Button
              danger
              icon={<DeleteOutlined />}
              shape="circle"
              onClick={() => deleteConfirm(key, record)}
            ></Button>

          
          </div>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 5 }}
    />
  );
}
