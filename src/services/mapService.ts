import html from "../http-common";

export const getPois = async () => {
  const response = await html.get("/map/pois");
  return response.data;
};

export const getIcons = async () => {
  const response = await html.get("/map/icons");
  return response.data;
};

export const createPoi = async (poi: any) => {
  const response = await html.post("/map/poi", poi);
  return response.data;
};
