import React, { useEffect } from "react";
import { Form, Button, Input, Descriptions } from "antd";
import { formItemLayout, tailFormItemLayout } from "./layout";
import * as styles from "./Fields/index.module.less";

import {
  MedicalField,
  NonMedicalField,
  MultipleDistrictSelect,
  WardListField,
} from "./Fields/Select";

import { StatusSelectRequestForm } from "../SelectorPanel/SelectFields";
//import { statusOptions } from "@components/SelectorPanel/SelectFields";
const { Item } = Descriptions;

import { DynamicServicList } from "./Fields/Dynamic";
import { Section } from "./Fields/Other";
const { TextArea } = Input;

function RequestForHelpUpdateForm({
  onSubmit,
  reset,
  record,
  regions,
  urban,
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

  const [district, setDistrict] = React.useState(
    initialValues.meta.district || []
  );

  function onDistrictChange(value) {
    setDistrict(value);
  }

  return (
    <div>
      <div>
        <Descriptions className={styles.requestForHelpFormDescriptions}>
          <Item label="PoC Name">{record.poc_name}</Item>
          <Item label="PoC Mobile">{record.poc_mobile}</Item>
          <Item label="Number of Persons">{record.nop}</Item>
          <Item label="Area">{record.area}</Item>
          <Item label="Region">
            {record && record.region && regions
              ? regions.find((x) => x.id === "17").children[
                  record.region[1] - 1
                ].label
              : record.region}
          </Item>
          <Item label="Pin Code">{record.pin}</Item>
          <Item label="Name">{record.name}</Item>
          <Item label="Mobile Number">{record.mobile}</Item>
          <Item label="Address">{record.address}</Item>
        </Descriptions>
      </div>
      <Section label="Request for Help Additonal Fields" />
      <br></br>
      <Form
        form={form}
        {...formItemLayout}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Description">
          <TextArea
            name="desc"
            type="textarea"
            rows={4}
            readOnly={true}
            value={record.desc}
          />
        </Form.Item>

        <MultipleDistrictSelect
          options={regions.find((x) => x.id === "17").children}
          onChange={onDistrictChange}
          nameVal={"region"}
          label="Region"
          mode="single"
          status={record && record.region ? record.region[1] : ""}
          placeholder="Please select Region"
        />

        <WardListField options={urban} isVisible={district.includes("5")} />

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

        <Form.Item label="Status">
          <StatusSelectRequestForm status={record.status} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RequestForHelpUpdateForm;
