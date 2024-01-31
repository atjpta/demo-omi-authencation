import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
function LoginConnectWallet() {
  const [nonce, setNonce] = useState("");
  const [signature, setSignature] = useState();
  const [address, setAddress] = useState();

  let message = "";

  const nonceTemp =
    "Sign this message to confirm you own this wallet address. This action will not cost any gas fees.\n\nNonce: {nonce}";

  const login = async () => {
    console.log("login ... ");
    if (!window.ethereum) {
      alert(
        "Please Install Metamask !!! \nInstall: https://metamask.io/download/"
      );
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const message = nonceTemp.replace("{nonce}", nonce);
      const signatureRes = await provider.getSigner().signMessage(message);
      setSignature(signatureRes);
      setAddress(await provider.getSigner().getAddress());
    } catch (error) {
      console.log(error);
    }
  };

  const onInput = (e) => {
    setNonce(e.target.value);
  };

  return (
    <div className="mx-auto w-fit">
      <button
        className={`btn text-2xl btn-lg ${!!nonce ? "" : "btn-disabled"}`}
        onClick={login}
      >
        Sign In by connect wallet
      </button>
      <div className="text-left ">
        <div>Nonce:</div>
        <input
          className="input input-primary w-full"
          value={nonce}
          onInput={onInput}
        />
      </div>
      {signature && (
        <>
          <div className="text-2xl">signature connect wallet</div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(signature);
              alert("copied signature connect wallet!!");
            }}
            className="w-96 p-5 mx-auto bg-white/20 overflow-hidden"
          >
            {signature}
          </div>
        </>
      )}

      {address && (
        <>
          <div className="text-2xl">address connect wallet</div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(address);
              alert("copied address connect wallet!!");
            }}
            className="w-96 p-5 mx-auto bg-white/20 overflow-hidden"
          >
            {address}
          </div>
        </>
      )}
    </div>
  );
}

export default LoginConnectWallet;
