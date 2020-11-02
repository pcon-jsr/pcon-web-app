import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCvRpDBkCCpWHIq74vUBGUgjFVzaIzfXwg",
    authDomain: "pcon-web-app.firebaseapp.com",
    databaseURL: "https://pcon-web-app.firebaseio.com",
    projectId: "pcon-web-app",
    storageBucket: "pcon-web-app.appspot.com",
    messagingSenderId: "273625173285",
    appId: "1:273625173285:web:b4c7f957baf786aeb41ecc",
    measurementId: "G-B3BBQQ35Y3"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export const firestore = firebase.firestore();
firestore.enablePersistence();
export const realTimeDB = firebase.database();

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
            throw error;
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
        throw error;
    }
}

export const interviewsCollectionRef = firestore.collection('interviews');

export const createInterviewDocument = async (userData, interviewData) => {

    const createdAt = new Date();
    try {
        await interviewsCollectionRef.add({
            user: userData,
            createdAt,
            ...interviewData,
        });
    } catch (error) {
        throw error;
    }
}

export const getInterviewDocument = async (interviewId) => {
    const interviewRef = interviewsCollectionRef.doc(interviewId);

    let interviewData = null;
    try {
        const snapshot = await interviewRef.get();
        interviewData = snapshot.data();
    } catch (error) {
        throw error;
    }

    return interviewData;
}

export const updateInterviewDocument = async (interviewId, userData, interviewData) => {

    const createdAt = new Date();
    try {
        await interviewsCollectionRef.doc(interviewId).set({
            user: userData,
            createdAt,
            ...interviewData,
        });
    } catch (error) {
        throw error;
    }
}

export const updateUserDetailsInInterviewDocument = async (userId, userDataUpdated) => {

    try {

        const userInterviewDocs = await interviewsCollectionRef.where('user.id', '==', userId).get();

        userInterviewDocs.docs.forEach(async doc => {
            if (doc.exists) {
                await doc.ref.update({
                    user: userDataUpdated,
                });
            }
        });
        
    } catch (error) {
        throw error;
    }
}

export const alumniRef = realTimeDB.ref().child('alumni');
export const achievementsRef = realTimeDB.ref().child('achievements');
export const eventsRef = realTimeDB.ref().child('events');
export const teamRef = realTimeDB.ref().child('team');
export const projectsRef = realTimeDB.ref().child('projects');
export const notificationsRef = realTimeDB.ref().child('notifications');

export default firebase;