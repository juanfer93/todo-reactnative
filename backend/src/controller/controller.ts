import { Request, Response } from 'express';
import pool from '../db/connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await pool.promise().query<RowDataPacket[]>(
      'SELECT * FROM todos LIMIT ? OFFSET ?',
      [limit, offset]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching todos' });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const [result] = await pool.promise().query<ResultSetHeader>(
      'INSERT INTO todos (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.json({ id: result.insertId, title, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating todo' });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    let updateQuery = "UPDATE todos SET ";
    let updateValues: any[] = [];
    if (title) {
      updateQuery += "title = ?, ";
      updateValues.push(title);
    }
    if (description) {
      updateQuery += "description = ?, ";
      updateValues.push(description);
    }
    if (updateQuery.endsWith(", ")) {
      updateQuery = updateQuery.slice(0, -2);
    }
    updateQuery += " WHERE id = ?";
    updateValues.push(id);
    await pool.promise().query(updateQuery, updateValues);
    res.json({ id, title, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await pool.promise().query('DELETE FROM todos WHERE id = ?', [id]);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting todo' });
  }
};
