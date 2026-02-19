import { Request, Response } from "express";
import Todo from "../models/todoModel";
import { error } from "console";

export class TodoController {
  // CREATE
  public async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const newTodo = await Todo.create(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: "Error creating todo", error });
    }
  }

  // READ ALL
  public async getTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await Todo.findAll();
      res.status(200).json({success: true, data: todos, message: "Todos retrieved successfully", error: null});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving todos", error });
    }
  }

  // UPDATE
  public async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // Sequelize update returns [numberOfAffectedRows]
      const [affectedCount] = await Todo.update(req.body, {
        where: { id: id },
      });

      if (affectedCount > 0) {
        // Optionally fetch the updated record to return it
        const updatedTodo = await Todo.findByPk(id);
        res.status(200).json(updatedTodo);
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating todo", error });
    }
  }

  // DELETE
  public async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedCount = await Todo.destroy({
        where: { id: id },
      });

      if (deletedCount > 0) {
        res.status(204).send(); // Success, no content
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting todo", error });
    }
  }
}
