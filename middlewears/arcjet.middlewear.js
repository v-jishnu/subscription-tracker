import aj from "../arcjet.config.js";

const arcjetMiddleware = async (req,res,next) => {
    try{
        const decision = await aj.protect(req,{requested: 1});
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message: "Too many requests. Please try again later."});
            }
            if(decision.reason.isBot()){
                return res.status(403).json({message: "Forbidden. Bot traffic is not allowed."});
            }
            return res.status(403).json({message: "Forbidden. Access denied."});
        }

        next();
    }
    catch(err){
        console.log(`error in arcjet middleware: ${err}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export default arcjetMiddleware;