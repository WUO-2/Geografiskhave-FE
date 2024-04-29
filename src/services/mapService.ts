import html from "../http-common";

export const getPois = async () => {
  const response = await html.get("/map/pois");
  return response.data;
};
