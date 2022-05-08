import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./sideMenu.css";
import style from "./sideMenu.module.scss";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
const { Sider } = Layout;

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};
const items = [
  getItem("首页", "sub1", <MailOutlined />, [
    getItem(
      "Item 1",
      "g1",
      null,
      [getItem("Option 1", "1"), getItem("Option 2", "2")],
      "group"
    ),
    getItem(
      "Item 2",
      "g2",
      null,
      [getItem("Option 3", "3"), getItem("Option 4", "4")],
      "group"
    ),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

const iconList = {
  "/home": <AppstoreOutlined />,
  "/user/listUser": <VideoCameraOutlined />,
};
export default function SideMenu(props) {
  let navigate = useNavigate();
  const params = useLocation();
  const openKey = ["/" + params.pathname.split("/")[1]];
  const [meun, setMenu] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3004/rights?_embed=children").then((res) => {
      // console.log(res.data);
      setMenu(res.data);
      // console.log(meun);
      // console.log(params)
    });
    // console.log("goo");
  }, []);

  const renderItems = (newList) => {
    // todo 循环权限逻辑和放link
    return newList.map((item) =>
      item.pagepermission === 1
        ? getItem(
            item.title,
            item.key,
            iconList[item.key],
            item.children.length > 0
              ? item.children.map((childItem) => {
                  // console.log(childItem);
                  return childItem.pagepermission === 1
                    ? getItem(
                        childItem.title,
                        childItem.key,
                        iconList[childItem.key]
                      )
                    : null;
                })
              : null
          )
        : null
    );
    return newList.map((item) => {});
  };
  const go = (item) => {
    // console.log(item);
    navigate(item.key);
  };
  return (
    // <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">news-system</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={params.pathname}
            defaultOpenKeys={openKey}
            items={renderItems(meun)}
            onClick={go}
          />
        </div>
      </div>
    </Sider>
  );
}
