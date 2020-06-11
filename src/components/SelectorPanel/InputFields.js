import React from "react";
import { Form, Input } from "antd";

export const RequestNameField = ({
  placeholder = "Enter your request ID",
  name = "requestId",
  onRequestIDChange,
}) => {
  return (
    <Form.Item name={name}>
      <Input
        maxLength={200}
        placeholder={placeholder}
        onChange={onRequestIDChange}
      />
    </Form.Item>
  );
};
