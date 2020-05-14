// format service data from form  => db
function formatSubRequestData(formData = {}) {
  const itemList = formData.services;
  const res = [];
  // each service
  Object.keys(itemList).forEach((k) => {
    // service may be an array or a nested object
    const service = itemList[k] || [];
    const items = [];

    if (Array.isArray(service)) {
      service.map((v) => {
        items.push({
          item: v,
          quantity: "",
          unit: "",
        });
      });
    } else {
      const values = service.values || {};
      Object.keys(values).forEach((v) => {
        items.push({
          item: v,
          quantity: values[v].quantity || "",
          unit: values[v].unit || "",
        });
      });
    }

    res.push({
      relief_type: k === "medical" ? k : "food",
      items: items,
    });
  });
  formData["subrequest"] = res;
  delete formData.services;
  delete formData.act;
  delete formData.region;
  delete formData.ward;
  delete formData.status;
  return formData;
}

export default formatSubRequestData;
