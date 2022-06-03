import firebase, { ServiceAccount } from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount as ServiceAccount),
  });
}

export const getAuth = () => firebase.auth();
