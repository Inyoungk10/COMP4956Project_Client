const jwt = require('jsonwebtoken');

/**
 * Middleware that checks if user's token is valid before performing an action.
 * @Author Cameron Wark
 */
 const auth = async (req, res, next) => {
    try {
        // get token sent
        const token = req.headers.authorization.split(" ")[1];

        // checks if token is the one we created or from google. 
        const isCustomAuth = token.length < 500;

        let decodedData; 


        // gets user id from token
        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            //req.userId = decodedData?.id;
            req.userId = decodedData.id;
        } else {
            decodedData = jwt.decode(token);
            //req.userId = decodedData?.sub;
            req.userId = decodedData.sub;
        }

        // pass the action on
        next();
    } catch (error) {
        console.log(error);
    }
}

//export default auth;
