import React, { useState, useEffect } from "react";
import { Button, Table, Tag, Popover, Modal, Switch } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  UnorderedListOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function ListRole() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3004/roles").then((res) => {
      setDataSource(res.data);
    });
  }, []);

  const deleteItem = (key) => {};

  const deleteConfirm = (key, record) => {
    console.log(key, record);
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "confirm to delete?",
      okText: "确认",
      cancelText: "取消",
      onOk: () => deleteItem(key),
    });
  };

  const editConfirm = (key, record) => {
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

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "role角色",
      dataIndex: "roleName",
      key: "id",
    },
    {
      title: "操作",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="primary"
              icon={<UnorderedListOutlined />}
              onClick={() => editConfirm(text, record)}
              shape="circle"
            ></Button>
            <Button
              danger
              onClick={() => deleteConfirm(text, record)}
              icon={<DeleteOutlined />}
              shape="circle"
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
      rowKey={(item) => item.id}
    />
  );
}
