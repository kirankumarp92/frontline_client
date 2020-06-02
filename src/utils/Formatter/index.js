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
};

export default formatter;
