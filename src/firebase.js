import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyALE4JD6ZByBzKXPGdA-TYP9MqeXAkHsRE",
  authDomain: "mimetic-planet-348209.firebaseapp.com",
  projectId: "mimetic-planet-348209",
  storageBucket: "mimetic-planet-348209.appspot.com",
  messagingSenderId: "29558780748",
  appId: "1:29558780748:web:c1254404ea4029019c55e9",
  measurementId: "G-76VMLPZ36W"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


