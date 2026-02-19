import { useEffect, useState } from "react";
import type { ICreateTodoDTO, ITodo } from "../types/todo.type";
import type { IUseTodosReturns } from "../types/hooks/todo.hook.type";
import { todoAPI } from "../services/axios";
import { ApiException } from "../types/apiResponse.type";

export function useTodos(): IUseTodosReturns {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof ApiException) {
      setError(err.message);
      console.error(err);
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const data = await todoAPI.getAllTodos();
        setTodos(data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const refetchTodos = async () => {
    setLoading(true);

    try {
      const data = await todoAPI.getAllTodos();
      setTodos(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Create todo
  const createTodo = async (todoData: ICreateTodoDTO) => {
    try {
      await todoAPI.createTodo(todoData);
      refetchTodos(); // Refresh the list after creating a new todo
    } catch (err) {
      handleError(err);
      throw err; // Re-throw so form can handle it
    }
  };

  // deleteTodo
  const deleteTodo = async (id: string) => {
    try {
      await todoAPI.deleteTodo(id);
      refetchTodos();
    } catch (err: any) {
      handleError(err);
      throw err;
    }
  }

  return {
    todos,
    loading,
    createTodo,
    deleteTodo,
    error,
    refetch: refetchTodos,
  };
}
