import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next)=>{
    try{
        // 1. extract token from req
        // we strored token in localStorage => localStorage.setItem('token', token)
        // authorization header => "Bearer <token>"
        // const token = req.headers["authorization"].split(' ')[1];

        // Alternative way to extract token from cookies
        const token = req.cookies?.token;
        if(!token){
            return res.status(400).json({
                message : "Token not found"
            })
        }

        // 2. Verfiy token => jwt.verify()
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // set payload in req
        req.employee = payload;

        next();
    }
    catch(err){
        return res.status(400).json({
            message : "Invalide Token"
        })
    }
}

export {verifyToken};