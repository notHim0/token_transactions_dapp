import React, { useState, useRef } from "react";
import { tokenList } from "./tokens/tokenList";
import fetch from "cross-fetch";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";
import { OptionList } from "./tokens/OptionsSelect";
import toast from "react-hot-toast";

const TokenSwap = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [inputTokenMint, setInputTokenMint] = useState("");
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [outputTokenMint, setOutputTokenMint] = useState("");
  const [inputAmount, setInputAmount] = useState(1);

  const [tokenDecimal, setTokenDecimal] = useState(1);

  async function getQuote() {
    if (!inputTokenMint || !outputTokenMint) {
      toast.error("Please select both tokens!");
      return;
    }
    toast("fetching...", { duration: 1000 });
    try {
      const quoteResponse = await (
        await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=${inputTokenMint}&outputMint=${outputTokenMint}&amount=${
            inputAmount * 10 ** tokenDecimal
          }&slippageBps=50`
        )
      ).json();

      if (quoteResponse.error) throw Error("Invalid Transaction!");
      console.log({ quoteResponse });

      setQuoteAmount(quoteResponse.outAmount / 10 ** tokenDecimal);

      toast.success(`Quote Generated Succesfully!`, { duration: 1000 });

      return quoteResponse;
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  }
  async function swap(e) {
    e.preventDefault();

    // const inputMint = outputTokenMint;
    // const outputMint = inputTokenMint;
    toast("Transaction Initiated...");
    try {
      const quoteResponse = await getQuote();
      const { swapTransaction } = await (
        await fetch("https://quote-api.jup.ag/v6/swap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quoteResponse,

            userPublicKey: wallet.publicKey.toString(),

            wrapAndUnwrapSol: true,
          }),
        })
      ).json();

      console.log("serilised transaction: ", swapTransaction);
      toast("serialising transaction...");

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      console.log("deserialised transaction: ", transaction);

      // transaction.sign([wallet.payer]);
      const signedTransaction = await wallet.signTransaction(transaction);
      console.log(signedTransaction);

      const rawTransaction = signedTransaction.serialize();
      console.log(rawTransaction);

      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        },
        "confirmed"
      );

      console.log(`https://solscan.io/tx/${txid}`);
      toast.success(`Transaction confirmed! https://solscan.io/tx/${txid}`, {
        duration: 3000,
      });
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  }
  function handleInputTokenSelect(data) {
    setTokenDecimal(data.tokenDecimal);
    setInputTokenMint(data.tokenMint);
  }
  function handleOutputTokenSelect(data) {
    setOutputTokenMint(data.tokenMint);
  }
  function handleInputChange(e) {
    setInputAmount(e.target.value);
  }

  return (
    <div className="card max-w-4xl m-auto">
      <h2 className="text-xl font-bold text-white mb-6">Swap Tokens</h2>
      <form onSubmit={swap} autoComplete="off" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              From
            </label>
            <input
              className="bg-white bg-opacity-0 border-none rounded-xl w-80 h-20 p-2 text-2xl focus:outline-none"
              id="to"
              name="to"
              type="text"
              defaultValue="1"
              placeholder="From"
              value={inputAmount}
              onChange={handleInputChange}
              required
            />
            <OptionList
              tokenList={tokenList}
              onTokenSelect={handleInputTokenSelect}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              To
            </label>
            <input
              className="bg-white bg-opacity-0 border-none rounded-xl w-80 h-20 p-2 text-2xl focus:outline-none"
              id="to"
              name="to"
              type="text"
              placeholder="To"
              value={quoteAmount || ""}
              readOnly
            />
            <OptionList
              tokenList={tokenList}
              onTokenSelect={handleOutputTokenSelect}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Amount
          </label>
          <div className="flex justify-between">
            <input
              type="number"
              className="input-field w-4/5"
              placeholder="Enter amount"
              value={inputAmount}
              onChange={handleInputChange}
            />
            <button
              className="inline btn-primary w-1/6"
              type="button"
              onClick={(e) => getQuote()}
            >
              Get Quote
            </button>
          </div>
        </div>
        <button type="submit" className="btn-primary mt-6">
          Swap Tokens
        </button>
      </form>
    </div>
  );
};

export default TokenSwap;
