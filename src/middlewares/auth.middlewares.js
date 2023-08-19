import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// export async function validateAuth(req, res, next) {
//     const { authorization } = req.headers;
//     const token = authorization?.replace("Bearer ", "");

//     if (!token) return res.sendStatus(401);

//     try {
//         const decodedToken = jwt.verify(token, JWT_SECRET);
//         res.locals.userId = decodedToken.userId;

//         next();
//     } catch (err) {
//         return res.sendStatus(401);
//     }
// }

export async function validateAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    try {
        const session = await findSessionDB(token);
        if (session.rowCount === 0) return res.sendStatus(401);
        res.locals.userId = session.rows[0].userId;

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// export async function validateUpdateCustomers(req, res, next) {

// }
