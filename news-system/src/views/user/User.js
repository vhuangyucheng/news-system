import React, { useState, useEffect } from "react";
import { Button, Table, Form, Input, Modal, Select, Switch } from "antd";
import axios from "axios";
import CollectionCreateForm from "../../component/user/CollectionCreateForm";
import {
  DeleteOutlined,
  UnorderedListOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function User() {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [regionVisible, setRegionVisible] = useState(false);

  const [fields, setfields] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState({});
  const [roleList, setRoleList] = useState([]);
  const [regionList, setRegionList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3004/users?_expand=role").then((res) => {
      setDataSource(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3004/roles").then((res) => {
      setRoleList(res.data);
      // console.log(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3004/regions").then((res) => {
      setRegionList(res.data);
      // console.log(res.data);
    });
  }, []);

  const deleteItem = (key) => {
    setDataSource(dataSource.filter((item) => item.id !== key.id));
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

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys: React.Key[], info: any) => {};

  const onSwitch = (key) => {
    key.roleState = key.roleState === true ? false : true;
    setDataSource([...dataSource]);
  };

  const onEdit = (item) => {
    setEditVisible(true);
    setCurrentEditItem(item);
    // console.log(item);
    const fields = [
      {
        name: ["username"],
        value: item.username,
      },
      {
        name: ["password"],
        value: item.password,
      },
      {
        name: ["region"],
        value: item.region,
      },
      {
        name: ["role"],
        value: item.roleId,
      },
    ];
    if (item.roleId === 1) {
      // console.log("setRegionVisible true");
      setRegionVisible(true);
    } else {
      setRegionVisible(false);
      // console.log("setRegionVisible false");
    }
    setfields(fields);
  };
  const columns = [
    {
      title: "region区域",
      dataIndex: "region",
      filters: 
      // [
      //   ...regionList.map(item=>({
      //     text: item.title,
      //     value:item.value
      //   }))
      // ]
      regionList.map(item=>({
        text: item.title,
        value:item.value
      }))
      ,
      render: (region) => {
        return <b>{region}</b>;
      },
    },
    {
      title: "角色role",
      dataIndex: "role",
      render: (role) => {
        return role.roleName;
      },
    },
    {
      title: "username用户名",
      dataIndex: "username",
    },
    {
      title: "password密码",
      dataIndex: "password",
    },
    {
      title: "state状态",
      dataIndex: "roleState",
      render: (roleState, item) => {
        return (
          <Switch
            onChange={() => onSwitch(item)}
            checked={roleState}
            disabled={item.default}
          ></Switch>
        );
      },
    },
    {
      title: "操作",
      render: (item, record) => {
        return (
          <div>
            <Button
              type="primary"
              icon={<UnorderedListOutlined />}
              onClick={() => onEdit(item)}
              shape="circle"
              disabled={item.default}
            ></Button>

            <Button
              danger
              onClick={() => deleteConfirm(item, record)}
              icon={<DeleteOutlined />}
              shape="circle"
              disabled={item.default}
            ></Button>
          </div>
        );
      },
    },
  ];

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
    //todo add to database
    setDataSource([
      ...dataSource,
      {
        id: 7, // this is fake
        username: values.username,
        password: values.password,

        role: { roleName: "testAdmin" },
        region: values.region,
        default: false,
      },
    ]);
  };

  const onEditCreate = (values) => {
    console.log(values);
    setEditVisible(false);
    setRegionVisible(!regionVisible);
    setDataSource(
      dataSource.map((item) => {
        if (item.id === currentEditItem.id) {
          const item3 = { ...item };
          item3.username = values.username;
          item3.password = values.password;
          item3.role.roleName = "testAdmin";
          item3.region = values.region;
          return item3;
        }
        return item;
      })
    );
  };

  const feature = () => {
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
        onClick={feature}
        shape="circle"
      >
        feature
      </Button>
      <Button
        style={{ margin: "19px" }}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增add
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 5 }}
      />
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        roleList={roleList}
        regionList={regionList}
      />
      <CollectionCreateForm
        visible={editVisible}
        onCreate={onEditCreate}
        onCancel={() => {
          setEditVisible(false);
          setRegionVisible(!regionVisible);
        }}
        roleList={roleList}
        regionList={regionList}
        fields={fields}
        _regionVisible={regionVisible}
      />
    </div>
  );
}
