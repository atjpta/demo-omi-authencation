import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";

function LoginGg() {
  const providerFb = new GoogleAuthProvider();
  const [tokenFirebase, setTokenFirebase] = useState("");
  const [user, setUser] = useState();

  const handleSingInGoogle = async () => {
    const auth = getAuth();
    signInWithPopup(auth, providerFb)
      .then(async (result) => {
        const user = result.user.reloadUserInfo;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
        setUser(error.customData._tokenResponse);
      })
      .finally(async () => {
        const token = await auth.currentUser.getIdToken();
        console.log("--- token ---");
        console.log(token);
        setTokenFirebase(token);
      });
  };

  return (
    <div className="">
      <button className="btn text-2xl btn-lg" onClick={handleSingInGoogle}>
        Sign In by google
      </button>
      {tokenFirebase && (
        <>
          <div className="text-2xl">token firebase</div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(tokenFirebase);
              alert("copied!!");
            }}
            className="w-96 p-5 mx-auto bg-white/20 overflow-hidden"
          >
            {tokenFirebase}
          </div>
        </>
      )}
      {user && (
        <div className="w-96 mx-auto p-10">
          <div className="mx-auto text-center">
            <img className="size-20 mx-auto" src={user.photoUrl} alt="" />
            <p>Your email ,{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginGg;
