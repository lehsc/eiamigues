import { Request, Response } from 'express';
import * as userService from '../services/user';
import { Users } from '../models/users';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

export const getUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if(!isNaN(id)){

        const users = await userService.getUser(id);
        res.status(200).json(users);
        return
      }

      res.status(400).json({message: "id not provided"});
      
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
};

export const updateUser = async(req: Request, res: Response) => {
     const data = req.body as Users;
      const id = Number(req.params.id)
      data.id = id;
      await userService.updateUser(data)
      res.json({id}).status(200)
}

export const deleteUser = async(req: Request, res: Response) => {
     const result = await userService.deleteUser(Number(req.params.id))
      res.json({isDeleted: result}).status(200)
}