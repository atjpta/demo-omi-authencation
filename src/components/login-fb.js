import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { useState } from "react";

function LoginFb() {
  const providerFb = new FacebookAuthProvider();
  const [tokenFirebase, setTokenFirebase] = useState("");
  const [user, setUser] = useState();

  const handleSingInFacebook = async () => {
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
      <button className="btn text-2xl btn-lg" onClick={handleSingInFacebook}>
        Sign In by facebook
      </button>
      {tokenFirebase && (
        <>
          <div className="text-2xl">token firebase</div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(tokenFirebase);
              alert("copied!!");
            }}
            className="w-96 p-5 mx-auto bg-blue-500/20 overflow-hidden"
          >
            {tokenFirebase}
          </div>
        </>
      )}
      {tokenFirebase && (
        <div className="w-96 mx-auto p-10">
          <div className="mx-auto text-center">
            <img className="size-20 mx-auto" src={user.photoUrl} alt="" />
            <p>Welcome, {user.fullName}</p>
            <p>Your email ,{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginFb;
