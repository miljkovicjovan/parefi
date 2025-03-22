import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from "./routes/auth";

var cors = require('cors')
dotenv.config();
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 4000;

//--- Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

//--- Routes
app.use("/auth", authRoutes);

app.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from the database' });
    }
});

app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

//-- Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
