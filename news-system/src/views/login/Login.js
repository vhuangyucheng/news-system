import "./Login.css";
import React, { useState, useEffect } from "react";

import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import axios from "axios";
import { useNavigate, useParams, useLocation,  } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const params = useLocation();

  useEffect(()=>{

    console.log(params);
  },[])
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    // axios.get('http://localhost:3004/users?username=${values.username}&password=${values.password}&_expand=role').then((res) => {}
    // setRegionList(res.data);
    axios({
      method: "get",
      url: "http://localhost:3004/users",
      params: {
        username: values.username,
        password: values.password,
        _expand: "role",
      },
    }).then((res) => {
      if (res.data.length === 0) message.info("not found");
      else {
        message.info("successfull");
        localStorage.setItem("token", JSON.stringify(res.data[0]));
        navigate("/home");
      }
    });
  };
 
  const test = ()=>{
    // localStorage.setItem("token", "4");

    navigate("/home")
}
  const particlesInit = async (main) => {
    // console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    // console.log(container);
  };
  return (
    <div className="page">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0d47a1",
            },
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
          fullScreen: {
            zIndex: 1,
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                mode: "repulse",
                parallax: {
                  force: 60,
                },
              },
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
                divs: {
                  distance: 200,
                  duration: 0.4,
                  mix: false,
                  selectors: [],
                },
              },
              grab: {
                distance: 400,
              },
              repulse: {
                divs: {
                  distance: 200,
                  duration: 0.4,
                  factor: 100,
                  speed: 1,
                  maxSpeed: 50,
                  easing: "ease-out-quad",
                  selectors: [],
                },
              },
            },
          },
          particles: {
            collisions: {
              enable: true,
            },
            color: {
              value: "#ffffff",
            },
            links: {
              color: {
                value: "#ffffff",
              },
              distance: 150,
              opacity: 0.4,
            },
            move: {
              attract: {
                rotate: {
                  x: 600,
                  y: 1200,
                },
              },
              enable: true,
              outModes: {
                default: "bounce",
                bottom: "bounce",
                left: "bounce",
                right: "bounce",
                top: "bounce",
              },
              speed: 5,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
              animation: {
                speed: 1,
                minimumValue: 0.1,
              },
            },
            size: {
              random: {
                enable: true,
                minimumValue: 10,
              },
              value: {
                min: 10,
                max: 15,
              },
              animation: {
                speed: 40,
                minimumValue: 0.1,
              },
            },
          },
        }}
      />
      
      <div className="formContainer">
        <div className="loginTitle">welcome and login</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                <div style={{ color: "#1890ff" }}>Remember me</div>
              </Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
        <div><Button onClick={test}> test </Button></div>
      </div>
    </div>
  );
}
