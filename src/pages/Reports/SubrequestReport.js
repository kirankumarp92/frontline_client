import React from "react";
import { connecter } from "@store/subrequestReport";
import SelectorPanel from "@components/SelectorPanel";
import options from "@utils/Options";
import { Empty } from "antd";
import { SubrequestSearchResults } from "@components/SearchResults";
import { formatSearchQuery } from "../utils";
//import ExportButton from "@components/Misc/ExportButton";

const ACT = "subrequest";

const SubrequestReport = ({
  result,
  requestId,
  setRequestId,
  region,
  setRegion,
  search,
  service,
  setService,
  pagination,
  dateRange,
  setDateRange,
  //exportCSV,
  setStatus,
  status,
  updateStatus,
}) => {
  function onRequestIDChange(value) {
    setRequestId(value.target.value);
  }

  function onRegionChange(value) {
    setRegion(value);
  }

  function onServiceChange(value) {
    setService(value);
  }

  const onDateRangeChange = (value) => {
    value ? setDateRange(value) : setDateRange([null, null]);
  };

  function onStatusChange(value) {
    setStatus(value);
  }

  function onResultClose(id, status) {
    const url = `/request/update/${id}`;
    updateStatus(url, { status: status });
  }

  function formatParams() {
    const query = formatSearchQuery({
      requestId,
      region,
      service,
      dateRange,
      status,
    });
    query.act = ACT; // fixed type field
    return query;
  }

  function triggerSearch({ page = 1, limit = pagination.limit }) {
    search({
      query: formatParams(),
      page,
      limit,
    });
  }

  // handle search and pagination actions
  function handleSearch() {
    triggerSearch({}); // need empty braces here
  }

  function handlePageChange(page = 1) {
    triggerSearch({ page });
  }

  function handleSizeChange(page, limit) {
    triggerSearch({ limit });
  }

  // function handleExport() {
  //   exportCSV({
  //     query: formatParams(),
  //   });
  // }

  const searchProps = {
    requestId,
    onRequestIDChange,

    region,
    regions: options.regions,
    onRegionChange,

    service,
    services: options.services.servicesTree,
    onServiceChange,

    dateRange: dateRange,
    onDateRangeChange,

    status,
    onStatusChange,

    onSubmit: handleSearch,
  };

  updateRecord(result); // append relieftype inside items to identify it belongs to which releief type

  function updateRecord(record) {
    if (record && record.subrequest && record.subrequest.length > 0) {
      for (var i = 0; i < record.subrequest.length; i++) {
        record.subrequest[i].relief_type =
          record.subrequest[i].sub_req.relief_type;
        record.subrequest[i].ngos_acceptance =
          record.subrequest[i].sub_req.ngos_acceptance;
        record.subrequest[i].priority = record.subrequest[i].sub_req.priority;
        record.subrequest[i].sr_status = record.subrequest[i].sub_req.sr_status;
        for (var j = 0; j < record.subrequest[i].sub_req.items.length; j++) {
          record.subrequest[i].sub_req.items[j].relief_type =
            record.subrequest[i].sub_req.relief_type;
        }
      }
    }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <h2>Subrequest Reports</h2>
      <div>
        <SelectorPanel {...searchProps} />
      </div>
      {result && result.subrequest && result.subrequest.length > 0 ? (
        <div style={{ margin: 30 }}>
          <SubrequestSearchResults
            record={result.subrequest}
            result={result.subrequest}
            pagination={pagination}
            onPageChange={handlePageChange}
            onShowSizeChange={handleSizeChange}
            onResultClose={onResultClose}
          />
          {/* <ExportButton onClick={handleExport} /> */}
        </div>
      ) : (
        <div style={{ marginTop: 100 }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
};

export default connecter(SubrequestReport);
