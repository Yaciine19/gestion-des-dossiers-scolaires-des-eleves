// import cookieParser from 'cookie-parser';
import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);


app.get('/', (req, res) => {res.send("Welcome to the gestion des dossiers scolaires des eleves")})


app.listen(PORT, () => console.log(`the server is start on http://localhost:${PORT}`) )

export default app;