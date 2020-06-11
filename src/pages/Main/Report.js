import React from "react";
import VolunteerReport from "../Reports/VolunteerReport";
import KindReport from "../Reports/KindReport";
import RequestReport from "../Reports/RequestReport";

// import AppealReport from "../Reports/AppealReport";
import SubrequestReport from "../Reports/SubrequestReport";
import NGOReport from "../Reports/NGOReport";
import FormToggle from "@components/FormToggle";
import { Spacer } from "@components/Utils";
import { Typography } from "antd";
const { Title } = Typography;

const reportsMap = {
  ngo: { id: "ngo", value: "NGO Approval", render: NGOReport },
  volunteer: { id: "volunteer", value: "Volunteer", render: VolunteerReport },
  kind: { id: "kind", value: "Support in Kind", render: KindReport },
  // appeal: { id: "appeal", value: "Appeal", render: AppealReport },
  request: { id: "request", value: "Request for help", render: RequestReport },
  subrequest: {
    id: "subrequest",
    value: "Subrequest List",
    render: SubrequestReport,
  },
};

const Placeholder = () => (
  <div>
    <Spacer height={25} display="block" />
    <Title level={4}>Please select a report type.</Title>
  </div>
);

const RenderPage = ({ type }) => {
  if (!type) {
    type =
      location.hash &&
      location.hash.split("?").length &&
      location.hash.split("?")[1]
        ? location.hash.split("?")[1]
        : "kind";
  } else {
    location.hash = "/report?" + type;
  }
  const PageToRender =
    type in reportsMap ? reportsMap[type].render : Placeholder;
  return <PageToRender />;
};

function Report() {
  const [type, setType] = React.useState(undefined);
  function onTypeChange(value) {
    setType(value);
  }

  return (
    <div>
      <FormToggle
        options={Object.values(reportsMap)}
        handleChange={onTypeChange}
        value={type}
      />
      <div>
        <RenderPage type={type} />
      </div>
    </div>
  );
}

export default Report;
