import "./Sandbox.css";
import React, { useEffect } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import NoPage from "../../component/NoPage";
import SideMenu from "../../component/sandbox/SideMenu";
import TopHeader from "../../component/sandbox/TopHeader";
import Home from "../index/Home";
import Test1 from "../test/test1";
import Test2 from "../test/test2";
import "antd/dist/antd.css";
import { Layout } from "antd";
import User from "../user/User";
import Autority from "../authority/Autority";
import ListRole from "../authority/ListRole"

const { Content } = Layout;

export default function Sandbox() {
  useEffect(() => {
    // axios.get("http://localhost:3004/rights?_embed=children").then((res)=>{
    //   console.log(res);
    //   setMenu(res.data);
    // })
    // console.log("sandbox");
  }, []);
  return (
    <Layout>
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader></TopHeader>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto"
          }}
        >
          <Routes>
            {/* <Route path="/"></Route> */}
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="test">
              <Route index element={<Test1 />} />
              <Route path="test2" element={<Test2 />} />
            </Route>
            <Route path="/user">
              <Route path="listUser" element={<User />} />
            </Route>
            <Route path="/authority">
              <Route path="listAuthority" element={<Autority />} />
              <Route path="listRole" element={<ListRole />} />
            </Route>
            <Route path="*" element={<NoPage />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
