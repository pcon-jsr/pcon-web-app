import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvRpDBkCCpWHIq74vUBGUgjFVzaIzfXwg",
    authDomain: "pcon-web-app.firebaseapp.com",
    databaseURL: "https://pcon-web-app.firebaseio.com",
    projectId: "pcon-web-app",
    storageBucket: "pcon-web-app.appspot.com",
    messagingSenderId: "273625173285",
    appId: "1:273625173285:web:ef80fa3180d23345b41ecc",
    measurementId: "G-F7DRRTNFMN"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' });
export const signInWithGoogle = () => firebaseAuth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuthData, additionalData) => {
    if (!userAuthData) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuthData.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuthData;
        const createdAt = new Date();

        try {
            await userRef.set({
                name: displayName,
                email,
                createdAt,
                photoURL,
                ...additionalData,
            })
        } catch (error) {
            console.log('error creating user: ', error.message);
        }
    }

    return userRef;
}

export const updateUserProfileDocument = async (userId, data) => {

    const userRef = firestore.doc(`users/${userId}`);
    try {
        await userRef.update({
            ...data,
        });
    } catch (error) {
        console.log('something went wrong: ', error.message);
    }
}

export default firebase;