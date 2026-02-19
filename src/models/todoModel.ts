import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: database,
    tableName: 'todos',
    timestamps: true,
  }
);

export default Todo;