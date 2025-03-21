import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

var cors = require('cors')
dotenv.config();
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        // Example: Fetch some data from the database
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from the database' });
    }
});

app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
