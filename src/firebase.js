// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    collection,
    doc,
    query,
    addDoc,
    updateDoc,
    getDocs,
    setDoc,
    deleteDoc,
    getCountFromServer,
    where,
    onSnapshot,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3ubvsPQedp3TMJecTHX4Nrg6wNrHPxvY",
    authDomain: "civilaid-65d59.firebaseapp.com",
    databaseURL: "https://civilaid-65d59-default-rtdb.firebaseio.com",
    projectId: "civilaid-65d59",
    storageBucket: "civilaid-65d59.appspot.com",
    messagingSenderId: "643971800555",
    appId: "1:643971800555:web:6c8cb91a3262551a8a0dae",
    measurementId: "G-H1H3JLMC8F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage();

const Add = async (parent, id, data) => {
    try {
        // if (id) {
        //     addDoc(collection(firestore, parent), data)
        //         .then(async (docRef) => {
        //             var documentID = docRef.id;
        //             const updateWithID = doc(firestore, parent, documentID);

        //             // Set the "capital" field of the city 'DC'
        //             await updateDoc(updateWithID, {
        //                 id: documentID,
        //             });
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // } else {
        //     await setDoc(doc(firestore, parent, `${id}`), data);
        // }

        await setDoc(doc(firestore, parent, `${id}`), data);
        alert(`${parent} added successfully!`);
    } catch (e) {
        alert("An error occured! Please try again later!");
        console.log(`Error on Add : ${e}`);
    }
};

const Delete = async (parent, id, collectionQuery) => {
    try {
        // if (collectionQuery) {
        //     const fetch = await Fetch(parent, collectionQuery);
        //     const fetchID = fetch.id;
        //     console.log(fetch);
        //     await deleteDoc(doc(firestore, parent, fetchID));
        // } else {
        //     await deleteDoc(doc(firestore, parent, id));
        // }
        await deleteDoc(doc(firestore, parent, id));
    } catch (e) {
        alert("An error occured! Please try again later!");
        console.log(`Error on Add : ${e}`);
    }
};

const Fetch = async (collectionName, collectionQuery) => {
    const q = collectionQuery
        ? query(collection(firestore, collectionName), collectionQuery)
        : query(collection(firestore, collectionName));

    var options = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        options.push(doc.data());
    });
    console.log(options);
    return options;

    // var options = [];
    // const snap = onSnapshot(q, (querySnapshot) => {
    //     // options = [];
    //     querySnapshot.forEach((doc) => {
    //         console.log(`Exists : ${!options.includes(doc.data())}`);
    //         if (!options.includes(doc.data())) {
    //             options.push(doc.data());
    //         }
    //     });

    //     console.log(options);
    // });
    // //  snap();
    // return options;
};

const Upload = (path, file) => {
    const storageRef = ref(storage, path);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");

        return true;
    });
};

export { app, analytics, firestore, storage, Fetch, Add, Delete, Upload };
