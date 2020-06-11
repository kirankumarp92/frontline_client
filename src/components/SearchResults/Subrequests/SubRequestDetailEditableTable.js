import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Select } from "antd";
import * as styles from "./styles.module.less";
import { connecter } from "@store/RequestForHelpUpdate";
const { Option } = Select;

let unitValue = "";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  unitValue = restProps.record ? restProps.record.unit : "";
  function onUnitChange(value) {
    unitValue = value;
  }

  return (
    <td {...restProps}>
      {editing ? (
        dataIndex === "quantity" ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          <Select defaultValue={unitValue} onChange={onUnitChange}>
            <Option value="count">Count</Option>
            <Option value="kilo">kg</Option>
            <Option value="litre">litres</Option>
            <Option value="na">NA</Option>
          </Select>
        )
      ) : (
        children
      )}
    </td>
  );
};

const SubRequestDetailEditableTable = (itemList) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(itemList.rowItems);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      item: "",
      quantity: "",
      unit: "",
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const saveData = async (key) => {
    try {
      const row = await form.validateFields();
      row.unit = unitValue;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item._id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        const updatedSubrequest = updateItemData(newData);
        const apiData = formatSubrequestUpdateData(updatedSubrequest);
        itemList.save(apiData);
        // const isDataSaved = itemList.save(apiData);
        // isDataSaved === 1 ? setData(newData) : cancel();
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  function formatSubrequestUpdateData(data) {
    let subrequestUpdateData = {};
    subrequestUpdateData.subrequest = [];
    for (var i = 0; i < data.sub_req.items.length; i++) {
      let item = Object.assign({}, data.sub_req.items[i]);
      delete item.relief_type;
      subrequestUpdateData.subrequest.push(item);
    }
    subrequestUpdateData.req_id = data.req_id;
    return subrequestUpdateData;
  }

  function updateItemData(newData) {
    let subrequestData = itemList.result;
    if (newData && newData.length > 0) {
      for (var i = 0; i < subrequestData.length; i++) {
        if (
          subrequestData[i].sub_req.relief_type[0] === newData[0].relief_type[0]
        ) {
          subrequestData[i].sub_req.items = newData;
          return subrequestData[i];
        }
      }
    }
  }

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => saveData(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel()}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "quantity" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        className={styles.tableMarginTop}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default connecter(SubRequestDetailEditableTable);
