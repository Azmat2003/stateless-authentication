const checkManager = (req, res, next) => {
    try{
        const {employee} = req;

        if(employee.role !== "manager"){
            return res.status(403).json({
                message : "Access Denied"
            })
        }

        next();
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export {checkManager};