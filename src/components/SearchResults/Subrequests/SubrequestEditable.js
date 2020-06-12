import React from "react";
import SubRequestDetailEditableTable from "./SubRequestDetailEditableTable";
import { Table } from "antd";

const SubrequestSearchResults = ({ record }) => {
  const columns = [
    {
      title: "Relief Type",
      dataIndex: "relief_type",
    },
    {
      title: "NGO",
      dataIndex: "ngos_acceptance",
    },
    {
      title: "Priority",
      dataIndex: "priority",
    },
    {
      title: "Status",
      dataIndex: "sr_status",
    },
  ];

  return (
    <div>
      <div>
        <Table
          columns={columns}
          dataSource={record}
          rowKey={(r) => r._id}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <SubRequestDetailEditableTable itemList={record} />
              </div>
            ),
            expandRowByClick: false,
          }}
          size="middle"
          pagination={{
            total: record.length,
            pageSize: record.length,
            hideOnSinglePage: true,
          }}
        />
      </div>
    </div>
  );
};

export default SubrequestSearchResults;
