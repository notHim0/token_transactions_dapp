import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as buffer from "buffer";
import toast from "react-hot-toast";

window.Buffer = buffer.Buffer;

export function SendTokens() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const sendTokens = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { recipient, amount } = Object.fromEntries(formData);
      console.log(recipient, amount);

      const isAccount = await connection.getAccountInfo(
        new PublicKey(recipient)
      );

      if (!isAccount) {
        alert("Invaild recipient public key!!");
        throw Error({ message: "INVALID PUBLIC KEY" });
      }
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
      toast.success(`${amount} SOL succesfully sent!`, {
        style: {
          width: "250px",
          height: "50px",
        },
      });
    } catch (e) {
      toast.error(e.message, {
        style: {
          width: "250px",
          height: "50px",
        },
      });
      console.log(e);
    }
  };

  return (
    <div className="card min-h-96 max-w-4xl m-auto ">
      <h2 className="text-xl font-bold text-white mb-6">Send Tokens</h2>
      <form onSubmit={sendTokens} className="space-y-4">
        <div>
          <label
            htmlFor="recipient"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Recipient Address
          </label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            className="input-field"
            placeholder="Enter recipient's wallet address"
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="input-field"
            placeholder="Enter amount"
            step="0.1"
            min="0"
            autoComplete="off"
            required
          />
        </div>
        <button type="submit" className="btn-primary mt-6">
          Send Tokens
        </button>
      </form>
    </div>
  );
}
