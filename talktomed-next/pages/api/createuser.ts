import { NextApiHandler } from "next";
import { adminApp } from "../../script/firebaseAdmin";

const createUser: NextApiHandler = async (req, res) => {

    const db = adminApp.firestore()
    const auth = adminApp.auth()
    const token = req.headers.authorization;
    try {
        auth.verifyIdToken(token as string)
    } catch (e) {
        return res.status(403).json({
            error: 'not authorized'
        })
    }
    try {
        const { email, formData } = JSON.parse(req.body);
        const user = await auth.createUser({
            email,
            emailVerified: false
        })
        db.doc('/Patients/' + user.uid).set({
            email,
            ...formData
        })
    } catch (e) {
        res.status(500).json({
            error: 'error',
            message: (e as Error).message
        })
    }
}

export default createUser