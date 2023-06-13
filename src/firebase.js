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

import {
    getStorage,
    ref,
    listAll,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    updateMetadata,
} from "firebase/storage";
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
const storage = getStorage(app);

const Add = async (parent, id, data, hasAlert) => {
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
        if (hasAlert === false) {
            alert(`${parent} added successfully!`);
        }
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
    // console.log(options);
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

const Upload = (path, files, fileName) => {
    var filePaths = [];
    files.map((file, index) => {
        // 'file' comes from the Blob or File API
        console.log(file);
        const extension = file.name.split(".").slice(-1);
        var storageRef = "";
        if (files.length <= 1) {
            storageRef = fileName
                ? ref(storage, `${path}/${fileName}`)
                : ref(storage, `${path}/${file.name}`);
        } else {
            storageRef = fileName
                ? ref(storage, `${path}/${fileName}-${index}`)
                : ref(storage, `${path}/${file.name}-${index}`);
        }

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                // console.log(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    filePaths.push(url);
                });
            }
        );

        alert("Upload Success!");
        console.log(filePaths);
    });
};

const UploadThenAdd = (path, files, fileName, parent, id, data) => {
    var filePaths = [];
    files.map((file, index) => {
        // 'file' comes from the Blob or File API
        console.log(file);
        const extension = file.name.split(".").slice(-1);
        var storageRef = "";
        if (files.length <= 1) {
            storageRef = fileName
                ? ref(storage, `${path}/${fileName}`)
                : ref(storage, `${path}/${file.name}`);
        } else {
            storageRef = fileName
                ? ref(storage, `${path}/${fileName}-${index}`)
                : ref(storage, `${path}/${file.name}-${index}`);
        }

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                // console.log(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    const newMetadata = {
                        filePath: url,
                    };
                    filePaths.push(url);
                    Add(
                        parent,
                        id,
                        {
                            ...data,
                            ...{
                                url: filePaths,
                            },
                        },
                        false
                    );
                });
            }
        );

        // alert("Upload Success!");
        console.log(filePaths);
    });
};
const GetFileByFileName = async (path, fileName) => {
    const listRef = ref(storage, "Assets/Subjects");
    var results = [];
    // Find all the prefixes and items.
    listAll(listRef)
        .then((res) => {
            console.log(res);
            res.prefixes.forEach((folderRef) => {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
                console.log(folderRef.root);
            });
            res.items.forEach((itemRef) => {
                // All the items under listRef.
                results.push(itemRef.fullPath);
                var fileBucket = itemRef.bucket;
                var filePath = itemRef.fullPath;
                var fullFilePath = `gs://${fileBucket}/${filePath}`;
                console.log(fullFilePath);
            });
        })
        .catch((error) => {
            // Uh-oh, an error occurred!
        });
    return results;
};
// async function fetchFilesContainingText(text) {
//     const storageRef = ref(storage, "Assets/Subjects");
//     const files = [];

//     try {
//         const { items } = listAll(storageRef);
//         console.log(items);
//         // Iterate over the items and check if the filename contains the specified text
//         for (const item of items) {
//             const { name } = item;

//             if (name.includes(text)) {
//                 files.push(name);
//             }
//         }

//         return files;
//     } catch (error) {
//         // Handle any errors that occur during the fetch
//         console.error("Error fetching files:", error);
//         return [];
//     }
// }

export {
    app,
    analytics,
    firestore,
    storage,
    Fetch,
    Add,
    Delete,
    Upload,
    UploadThenAdd,
    GetFileByFileName,
};
