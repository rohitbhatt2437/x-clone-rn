import {aj} from "../config/arcjet.js"

export const arcjetMiddeware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested:1,
        });

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({
                    error:"Too many requests",
                    message:"Rate limit exceeded. please try again later.",
                });
            } else if(decision.reason.isBot()){
                return res.status(403).json({
                    error:"Bot access denied",
                    message: "Automated requests are not allowed",
                });
            } else{
                return res.status(403).json({
                    error:"forbidden",
                    message:"Access denied by security policy."
                });
            }
        }
        if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())){
            return res.status(403).json({
                error: "spoofed bot detected",
                message: "malicious bot activity detected",
            })
        }
        next();
    } catch (error) {
        console.log("Arcjet middleware error: ",error);
        next();
    }
}