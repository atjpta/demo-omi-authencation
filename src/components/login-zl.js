import { useEffect, useState } from "react";
import axios from "axios";
function LoginZalo() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();

  function genCodeVerifier() {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let nonce = "";
    for (let i = 0; i < 43; i++) {
      nonce += chars[Math.floor(Math.random() * chars.length)];
    }
    return nonce;
  }

  async function genCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = await window.crypto.subtle.digest("SHA-256", data);
    let b64Hash = btoa(String.fromCharCode(...new Uint8Array(hash)));
    let code = b64Hash.replace(/\+/g, "-");
    code = code.replace(/\//g, "_");
    code = code.replace(/=+$/, "");
    return code;
  }

  const app_id = "2962344989252994609";
  const redirect_uri = "https://demo-omi-authencation.vercel.app";
  const state = "yes";
  const secret_key = "mDKuGtxwS188Vx1d2XVp";
  const grant_type = "authorization_code";
  // const code_verifier = genCodeVerifier();
  const code_verifier = "hrN3YCiPiZqQTHWxS8ZVi55PfUfIZTBZQ7FxoJu5Z5c";
  const code_challenge = "6cco2xiR9IzSQQ2e1eDfzMD0znbDTyJ53qk8JZhv8y4";
  const login = async () => {
    // const code_challenge = await genCodeChallenge(code_verifier);
    console.log(`Code Verifier: ${code_verifier}`);
    console.log(`Code Challenge: ${code_challenge}`);
    window.location.replace(
      `https://oauth.zaloapp.com/v4/permission?app_id=${app_id}&redirect_uri=${redirect_uri}&code_challenge=${code_challenge}&state=${state}`
    );
  };

  useEffect(() => {
    const code = window.location.search?.split("code=")[1]?.split("&state")[0];
    if (code) {
      axios
        .post(
          `https://oauth.zaloapp.com/v4/access_token`,
          {
            code,
            app_id,
            grant_type,
            code_verifier,
          },
          {
            headers: {
              secret_key,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setToken(res.data.access_token);
          console.log(res.data.access_token);
          axios
            .get("https://graph.zalo.me/v2.0/me?fields=id%2Cname%2Cpicture", {
              headers: {
                access_token: res.data.access_token,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data?.name) {
                setUser(res.data);
              }
            });
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className="">
      <button className="btn text-2xl btn-lg" onClick={login}>
        Sign In by zalo
      </button>
      {token && (
        <>
          <div className="text-2xl">token zalo</div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(token);
              alert("copied!!");
            }}
            className="w-96 p-5 mx-auto bg-white/20 overflow-hidden"
          >
            {token}
          </div>
        </>
      )}
      {user && (
        <div className="w-96 mx-auto p-10">
          <div className="mx-auto text-center">
            <img
              className="size-20 mx-auto"
              src={user.picture?.data?.url}
              alt=""
            />
            <p>Hello, {user.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginZalo;
