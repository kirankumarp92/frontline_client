//import React from "react";
import React, { useEffect } from "react";
import * as styles from "./index.module.less";
import { Spacer } from "@components/Utils";
import { useHistory } from "react-router-dom";

function RegistrationSuccessful(bIsSuccessful) {
  bIsSuccessful = false;
  const sSuccessRErrorMsg = bIsSuccessful
    ? "Registration Completed Successfully."
    : "Registration failed. Please try again.";

  let history = useHistory();
  useEffect(() => {
    if (bIsSuccessful) {
      setTimeout(() => {
        history.push("/"); // clear history
      }, 6000);
    } else {
      //redirect to registration page
    }
  }, []);

  return (
    <div>
      <Spacer display="block" height={20} />
      <div className={styles.loginWrapper}>
        <div className={styles.registrationSuccess}>{sSuccessRErrorMsg}</div>
      </div>
    </div>
  );
}

export default RegistrationSuccessful;
