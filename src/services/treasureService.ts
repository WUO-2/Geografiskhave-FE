import http from "../http-common";

export const getTask = async (id: number) => {
  return http.get(`treasurehunt/task/${id}`).then((response) => {
    return response.data;
  });
};
