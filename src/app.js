import express from 'express';
import employeeRoutes from './routes/employeeRoutes.js'
import authRoutes from './routes/authRoutes.js'
const app = express();

// global middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

export default app;