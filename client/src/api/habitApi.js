import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/habits"
});

export const createHabit = (data) =>
  API.post("/create", data);

export const logHabit = (habitId, completed) =>
  API.post(`/log/${habitId}`, { completed });

export const getHabits = (userId) =>
  API.get(`/${userId}`);