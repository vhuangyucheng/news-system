import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Menu, Space, Avatar } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate();
  const changeCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    // axios.get("http://localhost:3004/rights?_embed=children").then((res)=>{
    //   console.log(res);
    //   setMenu(res.data);
    // })
    // console.log("HEad goo");
  }, []);

  const menuOnClick= (key)=>{
    console.log(key)
    switch(key.key){
      case "tmp-3":
        localStorage.removeItem("token");
        navigate("/login");
        break;
    }
  }
  const menu = (
    <Menu
      onClick={menuOnClick}
      items={[
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              1st menu item
            </a>
          ),
        },
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu item (disabled)
            </a>
          ),
          icon: <SmileOutlined />,
          disabled: true,
        },
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              3rd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          danger: true,
          label: "exit退出",
          
        },
      ]}
    />
  );
  return (
    <Header
      className="site-layout-background"
      style={{ padding: 10, display: "flex", alignItems: "center", justifyContent:"space-between"}}
    >
      {/* {React.createElement(
        this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: this.toggle,
        }
      )} */}
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changeCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changeCollapsed} />
      )}
      {/* <div style={{ float: "right" }}> */}
      <div  >test</div>
      <div>
        <span>欢迎你welcome you</span>
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <div>
                <Avatar size={39} icon={<UserOutlined />} />
              </div>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}
