import { Request, Response } from 'express';

import Signature from '../models/signatureModel';

export const createSignature = async (req: Request, res: Response) => {
    try {
        const signature = new Signature(req.body);
        const saved = await signature.save();
        res.status(201).send(saved);
    } catch (error: any) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation Failed', details: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};