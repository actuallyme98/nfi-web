import React, { useState } from "react";

import * as EthersServices from "./services/ethers.service";

import "./App.css";

function App() {
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onDisconnectWallet = () => {
    setAddress("");
    setErrorMsg("");
  };

  const onConnectWallet = async () => {
    try {
      const account = await EthersServices.connectWallet();

      setAddress(account);
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="App">
      {address ? (
        <div className="addressContainer">
          <p className="addressText">Welcome {address}</p>

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
