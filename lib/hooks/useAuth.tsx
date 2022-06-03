import { Role } from "@prisma/client";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth } from "../firebase/client";

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  signInWithGoogle: (onSuccess?: () => void) => void;
  signOut: () => void;
  isSubmitting: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    user
      ?.getIdToken(true)
      .then((t) => {
        fetch("/api/auth/setCookie", {
          signal: controller.signal,
          headers: {
            authorization: `Bearer ${t}`,
          },
        });
        setToken(t);
      })
      .catch(console.error);
    console.log(user);

    return () => controller.abort();
  }, [user]);

  useEffect(() => {
    console.log("token", token);
  }, [token]);

  const signIn = async (email: string, password: string) => {
    setIsSubmitting(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {})
      .catch(handleFirebaseError)
      .finally(() => setIsSubmitting(false));
  };

  const register = async (email: string, password: string) => {
    setIsSubmitting(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {})
      .catch(handleFirebaseError)
      .finally(() => setIsSubmitting(false));
  };

  const signInWithGoogle = async (onSuccess?: () => void) => {
    setIsSubmitting(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCred) => {
        onSuccess && onSuccess();
      })
      .catch(handleFirebaseError)
      .finally(() => setIsSubmitting(false));
  };

  const signOut = async () => {
    firebaseSignOut(auth)
      .then((_) => {
        console.log("Signed out successfully");
      })
      .catch(handleFirebaseError);
  };

  const handleFirebaseError = (err: any) => {
    console.log(err);
    if (err instanceof Error) {
      console.error(err);
      // ...
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        register,
        signInWithGoogle,
        signOut,
        isSubmitting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
