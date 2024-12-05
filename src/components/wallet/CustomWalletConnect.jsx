import React, { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

function CustomWalletConnect() {
  const { connected, connecting, disconnecting, wallet } = useWallet();

  let buttonText = "Connect Wallet";
  if (connecting) {
    buttonText = "Connecting...";
  } else if (disconnecting) {
    buttonText = "Disconnecting...";
  } else if (connected) {
    buttonText = wallet.publicKey;
  } else {
    buttonText = "Connect Wallet";
  }

  return <WalletMultiButton>{buttonText}</WalletMultiButton>;
}

export default CustomWalletConnect;
