import { CustomNextPage } from "@lib/types/page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SSWithUser } from "@lib/wrappers/getServerSidePropsWrappers";
import usePush from "@lib/hooks/usePush";

const Verify: CustomNextPage = () => {
  const [emailSent, setEmailSent] = useState(false);
  const push = usePush();
  const router = useRouter();

  //   const resendEmail = async () => {
  //     if (user) {
  //       setEmailSent(true);
  //       sendEmailVerificationCode(user)
  //         .then(() => console.log("email sent"))
  //         .catch((err) => {
  //           setEmailSent(false);
  //         });
  //     }
  //   };

  //   useEffect(() => {
  //     if (user?.emailVerified) {
  //       const next = router.query.next as string;
  //       if (next) router.replace("/" + next);
  //       else router.replace(AfterLoginPage);
  //     }
  //   }, [user, router]);

  return (
    <div className="flex flex-col p-12 justify-center gap-y-4">
      <h1>Verify!!!</h1>

      {/* <div>
        <h3>You have been sent an email</h3>
        <p>Please verify your email</p>
        <button onClick={() => resendEmail()} disabled={emailSent}>
          Resend email
        </button>
      </div> */}
    </div>
  );
};

Verify.title = "Verify";
Verify.authRequired = "USER";

// export const getServerSideProps = SSWithUser<{}>(async (context) => {
//   if (context.session)

//   return { props: {} };
// });

export default Verify;
