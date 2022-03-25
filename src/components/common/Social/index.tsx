import React from "react";
import { auth } from "../../../services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  const result = await signInWithPopup(auth, provider);

  // The signed-in user info.
  const user = result.user;
  // This gives you a Google Access Token.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
};

const Social = () => {
  return (
    <div>
      <div className="social my-5">
        <div
          className="w-full text-white font-bold text-center py-2.5 rounded"
          onClick={signInWithGoogle}
        >
          Continue with Google
        </div>
      </div>

      <div className="flex items-center my-3 text-white font-extrabold ">
        <div className="border border-solid border-t-white w-5/12"></div>
        <div className="w-2/12 text-center">OR</div>
        <div className="border border-solid border-t-white w-5/12"></div>
      </div>
    </div>
  );
};

export default Social;
