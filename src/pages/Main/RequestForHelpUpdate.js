import React, { useEffect } from "react";
import RequestForHelpUpdateForm from "@components/VolunteerForm/RequestForHelpUpdateForm";
import options from "@utils/Options";
import formatter from "@utils/Formatter";
import { connecter } from "@store/RequestForHelpUpdate";

function RequestForHelpUpdate({
  save,
  reset,
  getRequestForHelpDetail,
  record,
}) {
  // default to Karnataka, Bangalore
  const initialValues = {
    region: [],
    meta: {},
  };
  const region = ["KA"];

  useEffect(() => {
    getRequestForHelpDetail(location.hash.split("?")[1]);
  }, []);

  function handleSubmit(formData) {
    if (formData) {
      formData.id = location.hash.split("?")[1];
      formData.act = "subrequest";
      region.push(formData.region);
      formData["region"] = region;
      formatter(formData);
      save(formData);
    }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <h2>Request for Help Update</h2>
      <div style={{ marginTop: 30 }}>
        <RequestForHelpUpdateForm
          {...options}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          reset={reset}
          record={record}
        />
      </div>
    </div>
  );
}

export default connecter(RequestForHelpUpdate);