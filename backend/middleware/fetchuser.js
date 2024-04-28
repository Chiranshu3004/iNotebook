const jwt = require('jsonwebtoken');


const JWT_SECRET = 'MyselfChiranshu';

//next ka matlab hai ki fetchuser k baad jo likha hai auth.js file mei usko run kr de
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object

    // thunderclient mei jo header wala section hota hai usme yeh auth-token daalke uski authorization token daalne pr hi saari details milti hai
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {

        //yeh verify krne k liye ki yeh token valid hai ya nahi
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;