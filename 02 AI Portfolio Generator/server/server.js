import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import portfolioRouter from './routes/portfolioRoute.js';

const app = express();

// App config
app.use(express.json());

// API Routes
app.use('/api/user', portfolioRouter);

// Root route (after other routes)
app.use('/', (req, res) => {
    res.send("Hello World API working 💖");
});

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
