import 'dotenv/config';
import app from './src/app.js';
import db from './src/config/db.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try{
        await db();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch(err){
        console.log('Error starting server:', err.message);   
    }
}

startServer();