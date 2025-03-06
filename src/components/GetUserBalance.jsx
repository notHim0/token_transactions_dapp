import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RefreshCcw } from "lucide-react";

export function ShowBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [amount, setAmount] = useState(0);
  async function fetchBalance() {
    toast("hello");
    try {
      if (!wallet.publicKey) {
        toast.error("Could not connect Wallet");
      }

      const balance = await connection.getBalance(wallet.publicKey);
      const balanceInSOL = balance / LAMPORTS_PER_SOL;

      setAmount(balanceInSOL);

      toast.success("User Balance Updated!");
    } catch (e) {
      toast.error("Could not fetch balance");
      console.log(e);
    }
  }

  useEffect(() => {
    fetchBalance();
  }, [wallet.publicKey]);
  return (
    <div className="min-w-96 min-h-96 flex justify-center items-center text-4xl">
      <p>
        SOL Balance: {amount}
        <br />
      </p>
      <button onClick={fetchBalance} className="mx-5">
        <RefreshCcw />
      </button>
    </div>
  );
}
