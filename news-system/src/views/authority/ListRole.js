import React, { useState, useEffect } from "react";
import { Button, Table, Tag, Popover, Modal, Tree } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  UnorderedListOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true,
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

export default function ListRole() {
  const [dataSource, setDataSource] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [currentRight, setCurrentRight] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3004/roles").then((res) => {
      setDataSource(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3004/rights?_embed=children").then((res) => {
      setRightList(res.data);
    });
  }, []);

  const deleteItem = (key) => {

    setDataSource(dataSource.filter(item=>{return item.id!==key.id}))
  };

  const deleteConfirm = (key, record) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "confirm to delete?",
      okText: "确认",
      cancelText: "取消",
      onOk: () => deleteItem(key),
    });
  };

  const showModal = (value) => {
    console.log(value);
    setCurrentRight(value.rights);
    setCurrentId(value.id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(currentId);

    const _dataSource = dataSource.map((item) => {
      if ((item.id === currentId)) {
        item.rights = currentRight;
        return item
      }
      return item
    });
    setDataSource(_dataSource);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys: React.Key[], info: any) => {
    setCurrentRight(checkedKeys);
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
              onClick={() => showModal(text)}
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

  const todo = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "confirm to delete?",
      okText: "确认",
      cancelText: "取消",
    });
  };
  return (
    <div>
      <Button
        type="primary"
        icon={<UnorderedListOutlined />}
        onClick={todo}
        shape="circle"
      >
        todo
      </Button>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          // defaultExpandedKeys={["0-0-0", "0-0-1"]}
          // defaultSelectedKeys={["0-0-0", "0-0-1"]}
          checkedKeys={currentRight}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={rightList}
          checkStrictly={true}
        />
      </Modal>
    </div>
  );
}
