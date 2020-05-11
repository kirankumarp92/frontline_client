import formatService from "./formatService";
import formatBbmp from "./formatBBMP";
import formatSubRequestData from "./formatSubRequestData";
import { formatNgoDistrict, formatBbmp } from "./formatAreas";

// format volunteer form data
export const formatter = (formData) => {
  if (
    formData.act !== "subrequest" &&
    "services" in formData &&
    formData.services
  ) {
    formData.services = formatService(formData.services);
  }
  if ("region" in formData && formData.region) {
    formData.region = formatNgoDistrict(formData.region);
  }
  if ("bbmp" in formData && formData.bbmp) {
    formData.bbmp = formatBbmp(formData.bbmp);
  }
  if (formData.act === "subrequest" && formData.services) {
    formData = formatSubRequestData(formData);
  }
  if ("mobile" in formData && formData.mobile) {
    formData.mobile = parseInt(formData.mobile);
  }
  if ("alt_mob" in formData && formData.alt_mob) {
    formData.alt_mob = parseInt(formData.alt_mob);
  }
  if ("nov" in formData && formData.nov) {
    formData.nov = parseInt(formData.nov);
  }
};

export default formatter;
