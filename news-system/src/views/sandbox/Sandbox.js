
import {  Routes, Route } from "react-router-dom";
import NoPage from "../../component/NoPage";
import SideMenu from "../../component/sandbox/SideMenu";
import TopHeader from "../../component/sandbox/TopHeader";
import Home from "../index/Home";
import Test1 from "../test/test1";
import Test2 from "../test/test2";
import "antd/dist/antd.css";
import { Layout } from "antd";
import "./Sandbox.css"
const {  Content } = Layout;

export default function Sandbox() {
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
          }}
        >
          <Routes>
            {/* <Route path="/"></Route> */}
            <Route index element={<Home />} />
            <Route path="test">
              <Route index element={<Test1 />} />
              <Route path="test2" element={<Test2 />} />
            </Route>

            <Route path="*" element={<NoPage />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
