import React, { useState } from "react";

import { ethers } from "ethers";

import "./App.css";

const ethereum = (window as any)?.ethereum;
const provider = new ethers.providers.Web3Provider(ethereum, "any");

function App() {
  const [network, setNetwork] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeAccountLisener = (accounts: string[]) => {
    setAddress(accounts[0]);
  };
  const onChangeNetworkListener = (newNetwork: any) => {
    setNetwork(newNetwork.name);
  };

  const onConnectWallet = async () => {
    try {
      const netwotk = await provider.getNetwork();
      setNetwork(netwotk.name);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);

      ethereum?.on("accountsChanged", onChangeAccountLisener);
      provider.on("network", onChangeNetworkListener);
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  const onDisconnectWallet = () => {
    setAddress("");
    setErrorMsg("");
    ethereum?.removeListener("accountsChanged", onChangeAccountLisener);
    provider.off("network", onChangeNetworkListener);
  };

  return (
    <div className="App">
      {address ? (
        <div className="addressContainer">
          <p className="contentText">Welcome {address}</p>
          <p className="contentText">Network: {network}</p>

          <button className="btn disconnectBtn" onClick={onDisconnectWallet}>
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <button className="btn connectWalletBtn" onClick={onConnectWallet}>
            Connect metamask
          </button>
        </div>
      )}

      {errorMsg && <div className="errorMsgText">{errorMsg}</div>}
    </div>
  );
}

export default App;
