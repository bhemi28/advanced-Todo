import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ApiException, type IApiResponse } from "../types/apiResponse.type";
import type { ICreateTodoDTO, ITodo } from "../types/todo.type";

const BASE_URL = "http://localhost:3000";

// axios instance
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// global interceptor for responses:
axiosClient.interceptors.response.use(
  (response) => response,

  // on errors:
  (error: AxiosError<IApiResponse>) => {
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(
        new ApiException({
          message: "Network error. Please check your connection.",
          statusCode: 0,
        }),
      );
    }

    // if we got the response then
    const { status, data } = error.response;
    switch (status) {
      case 401:
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;
      case 403:
      case 404:
      case 400:
      case 500:
        toast.error(data?.error || "An unexpected error occurred."); // This handles most UI feedback
        break;
      default:
        toast.error("An unexpected error occurred.");
    }
  },
);

export const todoAPI = {
  getAllTodos: async (): Promise<ITodo[]> => {
    const response = await axiosClient.get<IApiResponse<ITodo[]>>("/todos");
    return response.data.data;
  },
  createTodo: async (todoData: ICreateTodoDTO): Promise<ITodo> => {
    const response = await axiosClient.post<IApiResponse<ITodo>>(
      "/todos",
      todoData,
    );
    return response.data.data;
  },
  deleteTodo: async (id: string): Promise<void> => { await axiosClient.delete(`/todos/${id}`); }
};
