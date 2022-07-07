import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
  sendPasswordResetEmail,
  confirmPasswordReset as firebaseConfirmPasswordReset,
  sendEmailVerification,
  applyActionCode,
  onIdTokenChanged,
  Unsubscribe,
  updateProfile as firebaseUpdateProfile,
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
  signIn: (email: string, password: string) => Promise<SuccessResponse>;
  register: (email: string, password: string) => Promise<SuccessResponse>;
  signInWithGoogle: (onSuccess?: () => void) => Promise<SuccessResponse>;
  signOut: (onSignout: () => void) => void;
  isSubmitting: boolean;
  // isSigningOut
  isAuthenticating: boolean;
  token: string | null;
  verifyCode: (code: string) => Promise<void>;
  sendEmailVerificationCode: (user: User) => Promise<void>;
  onUserCredChanged: (callback: (user: User | null) => void) => Unsubscribe;
  resetPassword: (email: string) => Promise<SuccessResponse>;
  updateProfile: (
    user: User,
    details: {
      displayName?: string | null;
      photoURL?: string | null;
    }
  ) => Promise<SuccessResponse>;
}

interface ExtendedUser extends User {
  isValid: boolean;
}

interface SuccessResponse {
  data: {
    message: string;
  };
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
      // console.log(`user status is ${u !== null}`);

      if (u) {
        try {
          await addToken(u);
          window.localStorage.setItem(key, JSON.stringify(u));
          const data = await fetch("/api/auth/addUser").then((res) =>
            res.json()
          );
          console.log(data);
        } catch (err) {
          console.log(err);
          u = null;
        }
        // } else {
        //   if (localStorage.getItem(key)) {
        //     await fetch("/api/auth/signout", {
        //       method: "POST",
        //     });
        //   }
        //   setUser(null);
        //   window.localStorage.removeItem(key);
        // }
      } else if (window.localStorage.getItem(key)) {
        await fetch("/api/auth/signout", {
          method: "POST",
        });
        console.log("Signed out of firebase successfully");
        window.localStorage.removeItem(key);
      }

      // order matters here so no flashes of content
      setIsAuthenticating(false);
      setUser(u);
      console.log(u);

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
      .then((_) => handleSuccess("Sign in successful"))
      .catch(handleFirebaseError);
  };

  const resetPassword = async (email: string) => {
    setIsSubmitting(true);
    return sendPasswordResetEmail(auth, email)
      .then(() => handleSuccess("Email sent successfully."))
      .catch(handleFirebaseError);
  };

  const confirmPasswordReset = (confirmationCode: any, newPassword: string) => {
    return firebaseConfirmPasswordReset(auth, confirmationCode, newPassword);
  };

  const register = async (email: string, password: string) => {
    setIsSubmitting(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await sendEmailVerification(user);
      })
      .then((_) => {
        return handleSuccess("Registration successful. Must verify account.");
      })
      .catch(handleFirebaseError);
  };

  const sendEmailVerificationCode = (user: User) => {
    return sendEmailVerification(user).catch(handleFirebaseError);
  };

  const verifyCode = async (code: string) => {
    return applyActionCode(auth, code).catch(handleFirebaseError);
  };

  const onUserCredChanged = (
    callback: (user: User | null) => void
  ): Unsubscribe => {
    return () => {
      const unsubscribe = onIdTokenChanged(auth, callback);
      return unsubscribe;
    };
  };

  const signInWithGoogle = async (
    onSuccess?: () => void
  ): Promise<SuccessResponse> => {
    setIsSubmitting(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then(async (userCred) => {
        // await addToken(userCred.user);
        // onSuccess && onSuccess();
      })
      .then((_) => handleSuccess("Sign in successful"))
      .catch(handleFirebaseError);
  };

  /**
   * Signs user out
   * @remarks
   * Currently onSignout is not called on signout. Routing to sign in is done by RouteGuard for protected pages.
   * @param onSignout
   */
  const signOut = async (onSignout: () => void) => {
    // state for signing out?
    return firebaseSignOut(auth)
      .then(async (_) => {
        // await fetch("/api/auth/signout", {
        //   method: "POST",
        // });
        // console.log("Signed out of firebase successfully");
        // onSignout();
      })
      .catch(handleFirebaseError);
    // const res = await fetch("/api/auth/signout");
    // const data = await res.json();
    // console.log(data);
    // console.log("Cookie removed ");
  };

  const handleFirebaseError = (err: any) => {
    setIsSubmitting(false);
    if (err instanceof FirebaseError) {
      Object.entries(err).map(([key, val]) => {
        console.log(`${key}: ${val}`);
      });
      let message: string;
      switch (err.code) {
        case "auth/email-already-in-use":
          message = "Email already in use";
          break;
        case "auth/too-many-requests":
          message = "Too many requests made. Try again later.";
          break;
        case "auth/user-disabled":
          message = "Account has been disabled.";
          break;
        case "auth/app-deleted":
          message = "This app is no longer in use";
          break;
        case "auth/app-not-authorized":
          message = "This app has not been authorised yet";
          break;
        default:
          message = "Something went wrong. Please try again.";
      }
      throw Error(message);
    }

    throw err;
    console.log(err);
    if (err instanceof Error) {
      console.error(err);
      // ...
    }
  };

  const handleSuccess = (message: string): SuccessResponse => {
    setIsSubmitting(false);
    return {
      data: {
        message,
      },
    };
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
      setToken(t);
      return data;
    });
  };

  const updateProfile = async (
    user: User,
    details: { displayName?: string | null; photoURL?: string | null }
  ) => {
    return firebaseUpdateProfile(user, details)
      .then(() => handleSuccess("Information successfully updated."))
      .catch(handleFirebaseError);
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
        verifyCode,
        sendEmailVerificationCode,
        onUserCredChanged,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
