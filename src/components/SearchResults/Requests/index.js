import React from "react";
import { Table } from "antd";
import Details from "./Details";
import * as styles from "./styles.module.less";
import { getPaginationObject, renderStatus } from "../utils";
import { Link } from "react-router-dom";

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
                <Link
                  to={{
                    pathname: "/requestforhelpupdate",
                    search: record._id,
                  }}
                >
                  <button className={styles.updateRequestBtn}>
                    Update Request
                  </button>
                </Link>
                <Link
                  to={{
                    pathname: "/subrequestsOfRequest",
                    search: record._id,
                  }}
                >
                  <button className={styles.updateRequestBtn}>
                    View Subrequest List
                  </button>
                </Link>
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
