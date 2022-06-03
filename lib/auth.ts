import { getAuth } from "./firebase/admin";

export const verifyIdToken = async (firebaseToken: string) => {
  return getAuth()
    .verifyIdToken(firebaseToken)
    .then((_) => true)
    .catch((_) => false);
};
