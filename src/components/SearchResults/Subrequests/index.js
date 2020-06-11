import React from "react";
import SubRequestDetailEditableTable from "./SubRequestDetailEditableTable";
import { Table } from "antd";
import { getPaginationObject } from "../utils";

const SubrequestSearchResults = ({
  result,
  record,
  pagination,
  onPageChange,
  onShowSizeChange,
}) => {
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
          rowKey={(r) => r.sub_req._id}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <SubRequestDetailEditableTable
                  rowItems={record.sub_req.items}
                  result={result}
                />
              </div>
            ),
            expandRowByClick: false,
          }}
          pagination={getPaginationObject(
            pagination,
            onPageChange,
            onShowSizeChange
          )}
          size="middle"
        />
      </div>
    </div>
  );
};

export default SubrequestSearchResults;
