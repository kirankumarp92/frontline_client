import React from "react";
import { Table } from "antd";
import * as styles from "./styles.module.less";

const SubRequestDetails = ({ record }) => {
  const columns = [
    {
      title: "Item",
      dataIndex: "item",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
  ];
  return (
    <div>
      <div>
        <Table
          columns={columns}
          className={styles.tableMarginTop}
          dataSource={record}
          rowKey={(r) => r._id}
          bordered={true}
          size="middle"
        />
      </div>
    </div>
  );
};

export default SubRequestDetails;
