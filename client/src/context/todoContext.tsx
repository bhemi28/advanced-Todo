import { createContext, useContext, type ReactNode } from "react";
import { useTodos } from "../hooks/useTodo";
import type { IUseTodosReturns } from "../types/hooks/todo.hook.type";

const todoContext = createContext<IUseTodosReturns | null>(null)

const TodoProvider = ({ children }: { children: ReactNode }) => {
    const todoStates = useTodos();

    return (
        <todoContext.Provider value={todoStates}>
            {children}
        </todoContext.Provider>
    )
}

export const useTodoContext = (): IUseTodosReturns => {
    const context = useContext(todoContext);

    if (!context) {
        throw new Error("useTodoContext must be used within <TodoProvider>");
    }

    return context
}