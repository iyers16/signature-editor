import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import signatureRoutes from './routes/signatureRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(express.json());
app.use((req, res, next) => {
    console.log(`Request to ${req.url} at ${new Date().toISOString()}`);
    next();
});


// Use the signature route
app.use('/api/signatures', signatureRoutes);

app.get('/', (req, res) => {
    res.send('Backend is working!');
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB Atlas:', err);
    });

export default app;