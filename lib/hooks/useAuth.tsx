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
  user?: User | null;
  signIn: (email: string, password: string) => Promise<any>;
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
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true); // to see when to display page

  useEffect(() => {
    // optimistically show user, but authentication is not optimistic
    // this means there is a loading state for pages which require authentication
    // for pages where no auth is required, the user status can still be shown before authentication
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
      } else {
        console.log("invalid!");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      console.log(`user status is ${u !== null}`);

      if (u) {
        window.localStorage.setItem(key, JSON.stringify(u));
        await addToken(u);
      } else {
        window.localStorage.removeItem(key);
      }
      // order matters here so no flashes of content
      setIsAuthenticating(false);
      setUser(u);

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
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {})
      .catch(handleFirebaseError)
      .finally(handleSuccess);
  };

  const register = async (email: string, password: string) => {
    setIsSubmitting(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {})
      .catch(handleFirebaseError)
      .finally(handleSuccess);
  };

  const signInWithGoogle = async (onSuccess?: () => void) => {
    setIsSubmitting(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then(async (userCred) => {
        // await addToken(userCred.user);
        // onSuccess && onSuccess();
      })
      .catch(handleFirebaseError)
      .finally(handleSuccess);
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
    throw err;
    console.log(err);
    if (err instanceof Error) {
      console.error(err);
      // ...
    }
  };

  const handleSuccess = () => {
    setIsSubmitting(false);
    return;
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
