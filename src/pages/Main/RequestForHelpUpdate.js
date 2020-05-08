import React from "react";
import RequestForHelpUpdateForm from "@components/VolunteerForm/RequestForHelpUpdateForm";
import options from "@utils/Options";
import formatter from "@utils/Formatter";
import { connecter } from "@store/RequestForHelpUpdate";

function RequestForHelpUpdate({ save, reset }) {
  // default to Karnataka, Bangalore
  const initialValues = {
    region: ["KA", "5"],
  };

  function handleSubmit(formData) {
    if (formData) {
      formData.act = "requestforhelpupdate";
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
        />
      </div>
    </div>
  );
}

export default connecter(RequestForHelpUpdate);
