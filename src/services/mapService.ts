import html from "../http-common";
import httpForm from "../http-form";

export const getPois = async () => {
  const response = await html.get("/map/pois");
  return response.data;
};

export const getIcons = async () => {
  const response = await html.get("/map/icons");
  return response.data;
};

export const createPoi = async (poi: any) => {
  const response = await httpForm.post("/map/poi", poi);
  return response.data;
};
