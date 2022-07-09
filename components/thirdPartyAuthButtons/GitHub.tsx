export GitHub = () => {
    return <>
        <button
            onClick={() =>
              signIn("github", { callbackUrl: REDIRECT_AFTER_LOGIN_PAGE })
            }
            className="relative"
          >
            GitHub
          </button>
          <button onClick={() => signOut()}>Sign out</button>
    </>
}