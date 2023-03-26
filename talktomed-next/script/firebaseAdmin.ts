import admin from "firebase-admin";

const credential = JSON.parse(Buffer.from(process.env.ADMIN_CREDENTIAL as string, 'base64').toString('ascii'));

export const adminApp = admin.app() ?? admin.initializeApp({
    credential: admin.credential.cert(credential),
    databaseURL: 'https://talk2med-892ef.nam5.firebaseio.com'
})