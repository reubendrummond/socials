import { Role } from "@prisma/client";
import {
  createUserWithEmailAndPassword,
  getIdTokenResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import { auth } from "../firebase/client";

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  signInWithGoogle: (onSuccess?: () => void) => void;
  signOut: (onSignout: () => void) => void;
  isSubmitting: boolean;
  // isSigningOut
  isAuthenticating: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true); // to see when to display page

  useEffect(() => {
    // optimistic log in
    const key = "optimisticUserLoggedIn";
    const userString = window.localStorage.getItem(key);
    // console.log(userString);
    if (userString) {
      const u = JSON.parse(userString) as User;
      // const u = JSON.parse(JSON.stringify({ garbage: ":(" }));
      if (u.displayName && u.photoURL) {
        // console.log(u.getIdToken());
        // getIdTokenResult(u).then(console.log);
        setUser(u);
        setIsAuthenticating(false);
      } else {
        console.log("invalid!");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(`user status is ${user !== null}`);

      if (user) {
        window.localStorage.setItem(key, JSON.stringify(user));
        await addToken(user);
      } else {
        window.localStorage.removeItem(key);
      }
      setUser(user);
      setIsAuthenticating(false);
      // I don't like this but ensures that there are no flashes of pages
      // setTimeout(() => setIsAuthenticating(false), 10);

      // user.getIdToken(true).then(async (t) => {
      //   console.log("authorised with firebase");
      //   fetch("/api/auth/setCookie", {
      //     method: "POST",
      //     signal: controller.signal,
      //     headers: {
      //       authorization: `Bearer ${t}`,
      //     },
      //   })
      //     .then((res) => res.json())
      //     .then((data) => {
      //       console.log(data);
      //       setToken(t);
      //       setUser(user);
      //     });
      // });

      // const controller = new AbortController();
      // user?.getIdToken(true).then(async (t) => {
      //   console.log("authorised with firebase");
      //   const res = await fetch("/api/auth/setCookie", {
      //     signal: controller.signal,
      //     headers: {
      //       authorization: `Bearer ${t}`,
      //     },
      //   });
      //   const data = await res.json();
      //   console.log(data);
      //   console.log("token set in cookie");
      //   setToken(t);
      //   setUser(user);
      // });

      // return () => controller.abort();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onIdTokenChanged(auth, (user) => {
  //     // console.log(`token status ${user !== null}`);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const controller = new AbortController();

  //   user
  //     ?.getIdToken(true)
  //     .then((t) => {
  //       fetch("/api/auth/setCookie", {
  //         signal: controller.signal,
  //         headers: {
  //           authorization: `Bearer ${t}`,
  //         },
  //       });
  //       setToken(t);
  //     })
  //     .catch(console.error);
  //   console.log(user);

  //   return () => controller.abort();
  // }, [user]);

  // useEffect(() => {
  //   console.log("token", token?.slice(-10));
  // }, [token]);

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
      .then(async (userCred) => {
        // await addToken(userCred.user);
        // onSuccess && onSuccess();
      })
      .catch(handleFirebaseError)
      .finally(() => setIsSubmitting(false));
  };

  const signOut = async (onSignout: () => void) => {
    // state for signing out?
    firebaseSignOut(auth)
      .then(async (_) => {
        await fetch("/api/auth/signout", {
          method: "POST",
        });
        console.log("Signed out of firebase successfully");
        onSignout();
      })
      .catch(handleFirebaseError);
    // const res = await fetch("/api/auth/signout");
    // const data = await res.json();
    // console.log(data);
    // console.log("Cookie removed ");
  };

  const handleFirebaseError = (err: any) => {
    console.log(err);
    if (err instanceof Error) {
      console.error(err);
      // ...
    }
  };

  const addToken = async (user: User) => {
    return user.getIdToken(true).then(async (t) => {
      const res = await fetch("/api/auth/setCookie", {
        method: "POST",
        headers: {
          authorization: `Bearer ${t}`,
        },
      });
      const data = await res.json();
      console.log(data, t);
      setToken(t);
    });
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
        isAuthenticating,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
