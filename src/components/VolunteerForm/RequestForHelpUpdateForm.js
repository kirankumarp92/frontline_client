import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { formItemLayout, tailFormItemLayout } from "./layout";

import { MedicalField, NonMedicalField, RegionSelect } from "./Fields/Select";
import { StatusSelectRequestForm } from "../SelectorPanel/SelectFields";
import { statusOptions } from "@components/SelectorPanel/SelectFields";

const { TextArea } = Input;
import {
  MobileField,
  AddressField,
  PinField,
  NameField,
  ConfirmMobileField,
  NOPField,
} from "./Fields/Input";
import { DynamicServicList } from "./Fields/Dynamic";
import { Section } from "./Fields/Other";

function RequestForHelpUpdateForm({
  onSubmit,
  reset,
  regions,
  services,
  initialValues,
}) {
  const [form] = Form.useForm();
  const { resetFields } = form;

  const [medical, setMedical] = React.useState([]);
  const [nonMedical, setNonMedical] = React.useState([]);

  useEffect(() => {
    resetFields();

    setMedical([]);
    setNonMedical([]);
  }, [reset]);

  const onFinish = (values) => {
    onSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("form error", errorInfo);
  };

  const getMetaMap = (meta) =>
    meta.map((m) => ({ id: m.key, value: m.children }));

  function onMedicalChange(values, meta) {
    const res = getMetaMap(meta);
    setMedical(res);
  }

  function onNonMedicalChange(values, meta) {
    const res = getMetaMap(meta);
    setNonMedical(res);
  }

  return (
    <Form
      form={form}
      {...formItemLayout}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Section label="Help Required At" />

      <NameField
        label="Point of Contact - Name"
        placeholder="Enter point of contact's name"
        name="poc_name"
        disabled="true"
      />

      <MobileField
        name="poc_mobile"
        label="Point of Contact - Mobile"
        placeholder="Enter point of contact's mobile number"
        disabled="true"
      />
      <Form.Item
        label="Description"
        name="desc"
        rules={[
          {
            required: true,
            message: "Description is required.",
          },
        ]}
      >
        <TextArea
          type="textarea"
          rows={4}
          disabled
          placeholder="Please describe your request along with secondary contact info if any"
        />
      </Form.Item>

      <NOPField disabled="true" />

      <Form.Item
        label="Area"
        name="area"
        rules={[
          {
            required: true,
            message: "Area is required.",
          },
        ]}
      >
        <Input placeholder="Enter area/locality" disabled />
      </Form.Item>

      <RegionSelect options={regions} />

      <PinField />

      <MedicalField
        options={services.medicalOptions}
        onChange={onMedicalChange}
      />

      <DynamicServicList serviceType="medical" options={medical} />

      <NonMedicalField
        options={services.nonMedicalOptions}
        onChange={onNonMedicalChange}
      />
      <DynamicServicList serviceType="nonmedical" options={nonMedical} />

      <Form.Item label="Status" name="status">
        <StatusSelectRequestForm status={statusOptions} />
      </Form.Item>

      <Section label="Request Raised By" />

      <NameField disabled="true" />
      <MobileField disabled="true" />
      <ConfirmMobileField disabled="true" />
      <AddressField disabled="true" />

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RequestForHelpUpdateForm;
