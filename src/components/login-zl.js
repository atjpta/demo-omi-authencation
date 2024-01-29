import { useEffect } from "react";
import axios from "axios";
const crypto = require("crypto");
const base64url = require("base64url");
function LoginZalo() {
  // Tạo code verifier
  let code_verifier = base64url(crypto.randomBytes(32));

  // Tạo code challenge
  let hash = crypto.createHash("sha256").update(code_verifier).digest("hex");
  let code_challenge = base64url.fromBase64(
    Buffer.from(hash, "hex").toString("base64")
  );

  const app_id = "2962344989252994609";
  const redirect_uri = "https://glorious-ringtail-trivially.ngrok-free.app";
  const state = "yes";

  console.log(`Code Verifier: ${code_verifier}`);
  console.log(`Code Challenge: ${code_challenge}`);

  //   useEffect(() => {
  //     axios({
  //       method: "post",
  //       //   headers: {
  //       //     "secret-key": "mDKuGtxwS188Vx1d2XVp",
  //       //   },
  //       url: `https://oauth.zaloapp.com/v4/permission?app_id=${app_id}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&state=${state}`,
  //     })
  //       .then((dataA) => {
  //         console.log(dataA);
  //       })
  //       .catch((error) => console.log(error));
  //   });

  return <>zalo</>;
}

export default LoginZalo;
