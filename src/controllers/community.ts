import { Request, Response } from 'express';
import * as communityService from '../services/community.js';

export const createCommunity = async (req: Request, res: Response) => {
  try {
    const community = await communityService.createCommunity(req.body);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar comunidade', error });
  }
};

export const updateCommunity = async (req: Request, res: Response) => {
  try {
    const community = await communityService.updateCommunity(req.body);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar comunidade', error });
  }
};

export const getCommunity = async (req: Request, res: Response) => {
  try {
    const community = await communityService.getCommunity(req.params.name);
    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

export const followCommunity = async (req: Request, res: Response) => {
  try {
    const community = await communityService.followCommunity(req.body);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao seguir comunidade', error });
  }
};

export const unfollowCommunity = async (req: Request, res: Response) => {
  try {
    const community = await communityService.unfollowCommunity(req.body);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deixar de seguir comunidade', error });
  }
};
