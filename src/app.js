import express from 'express';
import cookieParser from 'cookie-parser';
import employeeRoutes from './routes/employeeRoutes.js'
import authRoutes from './routes/authRoutes.js'
const app = express();

// global middleware
app.use(express.json());    // extract data from body
app.use(cookieParser());    // extract data from cookies (cookies are attached on the header of request)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

export default app;