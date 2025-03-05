const {validateToken} = require('../utils/auth')


function checkForAuthCookie(cookieName){
    return (req, res, next) => {
        //console.log("Middleware Triggered");

        const tokenCookieValue = req.cookies[cookieName]
        //console.log("Cookie Found:", tokenCookieValue)

        if(!tokenCookieValue){
            console.log("❌ No Token in Cookies")
            res.locals.user = null
            return next()
        }

        try{
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload
            res.locals.user = userPayload
            
            // console.log("User extracted from token:", req.user)
            // console.log("User available in EJS templates:", res.locals.user)
        }
        catch(error){
            console.log("❌ Invalid Token:", error.message)
            res.locals.user = null
        }  
        
        return next()     
    }
}


module.exports = {
    checkForAuthCookie,
}