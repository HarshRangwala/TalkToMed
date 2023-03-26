import { FirebaseError } from "firebase/app";
import { NextApiHandler } from "next";
import { adminApp,  } from "../../script/firebaseAdmin";

const createUser: NextApiHandler = async (req, res) => {

    const db = adminApp.firestore()
    const auth = adminApp.auth()
    const token = req.headers.authorization?.slice(7)
    try {
        auth.verifyIdToken(token as string)
    } catch (e) {
        return res.status(403).json({
            error: 'not authorized'
        })
    }
    try {
        const { email, formData } = req.body
        console.log(email, formData)
        const user = await auth.createUser({
            email,
            password: Math.random().toString(36).slice(2,8),
            emailVerified: false
        })
        const userDoc = db.doc('/Patients/' + user.uid).set({
            email,
            ...formData
        })
        res.status(200).json({
            user: user.uid
        })
    } catch (e) {
        console.error(e)
        if (e instanceof FirebaseError && e.code == 'auth/invalid-email') {
            return res.status(403).json({
                error: 'Email'
            })
        }
        res.status(500).json({
            error: 'error',
            message: (e as Error).message
        })
    }
}

export default createUser