type IStatus = "completed" | "archived" | "pending"

export interface ITodo {
    id: number;
    title: string;
    status: IStatus;
    isDeleted: boolean;
    createdAt: string;
}

export interface ICreateTodoDTO {
    title: string;
    status: IStatus;
}