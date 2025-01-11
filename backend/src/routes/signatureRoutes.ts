import express from 'express';
import {
    createSignature,
    // getAllSignatures,
    // getSignatureById,
    // updateSignature,
    // deleteSignature,
} from '../controllers/signatureController';

const router = express.Router();

router.post('/', createSignature);
// router.get('/', getAllSignatures);
// router.get('/:id', getSignatureById);
// router.put('/:id', updateSignature);
// router.delete('/:id', deleteSignature)

export default router;
