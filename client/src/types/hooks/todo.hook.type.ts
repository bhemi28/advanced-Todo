import type { ICreateTodoDTO, ITodo } from "../todo.type";

export interface IUseTodosReturns {
    loading: boolean;
    error?: string| null;
    todos: ITodo[];
    createTodo: (data: ICreateTodoDTO) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    refetch: () => Promise<void>;
}