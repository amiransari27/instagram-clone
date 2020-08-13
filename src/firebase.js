import firebase from "firebase"


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC78lvNDUwyIS_Ob57z1fCC3ZNrdtLiupA",
    authDomain: "instagram-clone-54351.firebaseapp.com",
    databaseURL: "https://instagram-clone-54351.firebaseio.com",
    projectId: "instagram-clone-54351",
    storageBucket: "instagram-clone-54351.appspot.com",
    messagingSenderId: "13308730825",
    appId: "1:13308730825:web:5712fef2a1e4199e619c18",
    measurementId: "G-MZCTRNM2VD"
})


const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export { db, auth, storage }