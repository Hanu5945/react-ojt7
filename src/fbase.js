import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseUrl:process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// initializeApp를 사용하여 firebaseConfig의 Firebase 초기화
firebase.initializeApp(firebaseConfig);

// SDK를 firebaseInstance로 내보냄 [SDK : 소프트웨어 개발 키트] (SDK = firebase)
export const firebaseInstance = firebase;

// Firebase의 인증 서비스 객체를 authService로 내보냄
export const authService = firebase.auth();

// // 데이터베이스에 대한 서비스 객체를 dbService로 내보냄
export const dbService = firebase.firestore();

// // storage 서비스 객체를 storageService 내보냄
// export const storageService = firebase.storage();

// export default firebase.initializeApp(firebaseConfig);