import React, { useEffect } from "react";
import { connecter } from "@store/RequestForHelpUpdate";
import { SubrequestSearchResults } from "@components/SearchResults";
import { Empty } from "antd";

const SubrequestOfMainRequest = ({ getRequestForHelpDetail, record }) => {
  useEffect(() => {
    getRequestForHelpDetail(location.hash.split("?")[1]);
  }, []);

  updateRecord(record); // append relieftype inside items to identify it belongs to which releief type

  function updateRecord(record) {
    if (record && record.subrequest && record.subrequest.length > 0) {
      for (var i = 0; i < record.subrequest.length; i++) {
        for (var j = 0; j < record.subrequest[i].items.length; j++) {
          record.subrequest[i].items[j].relief_type =
            record.subrequest[i].relief_type;
        }
      }
    }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <h2>Subrequest List</h2>
      {record && record.subrequest && record.subrequest.length > 0 ? (
        <div style={{ margin: 30 }}>
          <SubrequestSearchResults record={record.subrequest} />
        </div>
      ) : (
        <div style={{ marginTop: 100 }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
};

export default connecter(SubrequestOfMainRequest);
