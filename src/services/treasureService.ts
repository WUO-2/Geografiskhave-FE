import http from "../http-common";

export const getTask = async (id: number) => {
  return http.get(`treasurehunt/task/${id}`).then((response) => {
    return response.data;
  });
};

export const startTreasureHunt = async (userId: string) => {
  return http.post("treasurehunt/start", { id: userId }).then((response) => {
    return response.data;
  });
};

export const answer = async (id: string, answerId: number) => {
  return http
    .post("treasurehunt/answer", { id: id, answer: answerId })
    .then((response) => {
      return response.data;
    });
};

export const getTasks = async () => {
  return http.get("treasurehunt/tasks").then((response) => {
    return response.data;
  });
};
