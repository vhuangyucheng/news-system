import React, { useState, useEffect, useInsertionEffect } from "react";

import { Form, Input, Modal, Select } from "antd";

export default function CollectionCreateForm({
  visible,
  onCreate,
  onCancel,
  regionList,
  fields,
  roleList,
  _regionVisible,
}) {
  const [regionVisible, setRegionVisible] = useState(false);
  //   const [fields, setFiels] = useState(field);

  const { Option } = Select;

  const [form] = Form.useForm();

  //   const fields = [
  //     {
  //       name: ["username"],
  //       value: "Ant Design",
  //     },
  //   ];

  useEffect(() => {
    // console.log("useEffect", _regionVisible);
    setRegionVisible(_regionVisible);
  }, [_regionVisible]);

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        // setRegionVisible(!regionVisible)
        // setRegionVisible(false);
        // console.log("onCancel", regionVisible);
        onCancel();
        // form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" fields={fields}>
        <Form.Item
          name="username"
          label="username"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="region"
          label="region   **tips:when role = admin, this field is not required"
          rules={[
            {
              required: !regionVisible,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Select style={{ width: 450 }} disabled={regionVisible}>
            {regionList.map((item) => {
              return (
                <Option value={item.value} key={item.id}>
                  {item.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="role"
          label="role角色"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Select
            style={{ width: 450 }}
            onChange={(value) => {
              if (value === 1) {
                setRegionVisible(true);
                console.log(form);
                form.setFieldsValue({ region: "" });
              } else {
                setRegionVisible(false);
              }
            }}
          >
            {roleList.map((item) => {
              return (
                <Option value={item.roleType} id={item.id} key={item.id}>
                  {item.roleName}
                </Option>
              );
            })}
            ;
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
