import http from "../http-common";
import httpForm from "../http-form";

export const getPois = async () => {
  const response = await http.get("/map/pois");
  return response.data;
};

export const getIcons = async () => {
  const response = await http.get("/map/icons");
  return response.data;
};

export const createPoi = async (poi: any) => {
  const response = await httpForm.post("/map/poi", poi);
  return response.data;
};

export const deletePoi = async (id: number, userId: string) => {
  const user = { userId: userId };
  const response = await http.delete(`/map/poi/${id}`, { data: user });
  return response.data;
};

export const updatePoi = async (id: number, poi: any) => {
  console.log(poi);
  const response = await httpForm.put(`/map/poi/${id}`, poi);
  return response.data;
};
