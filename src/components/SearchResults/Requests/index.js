import React from "react";
import { Table } from "antd";
import Details from "./Details";
import * as styles from "./styles.module.less";
import { getPaginationObject, renderStatus } from "../utils";

const RequestSearchResults = ({
  result,
  pagination,
  onPageChange,
  onShowSizeChange,
  onResultClose,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },

    {
      title: "Region",
      dataIndex: "region",
    },

    {
      title: "Created",
      dataIndex: "createdAt",
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (id, row) => renderStatus(id, row, onResultClose),
    },
  ];

  const navigateToUpdateRequestPage = function () {
    console.log(arguments[0]);
  };

  return (
    <div>
      <div>
        <Table
          columns={columns}
          dataSource={result}
          rowKey={(r) => r._id}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <Details record={record} />
                <button
                  className={styles.updateRequestBtn}
                  onClick={navigateToUpdateRequestPage(record._id)}
                >
                  Update Request
                </button>
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

export default RequestSearchResults;
