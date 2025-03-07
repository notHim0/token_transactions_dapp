import React, { useEffect, useState } from "react";
import { fetchRates } from "./tokens/tokenPriceList";

const TokenList = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const tokenData = await fetchRates();
        setTokens(tokenData);
      } catch (error) {
        console.error("Error fetching token prices:", error);
        setTokens([]);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="absolute card mt-20 max-w-5xl left-1/2 transform -translate-x-1/2 w-full">
      <h2 className="text-xl font-bold text-white mb-6">Token Prices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokens.length > 0 ? (
          tokens.map((token) => (
            <div
              key={token.token}
              className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg border border-dark-600 
                     hover:border-primary-500/30 hover:bg-dark-600/50 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="font-bold text-white">{token.token}</div>
                <div className="text-gray-400 text-sm">$USD</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-white font-medium">{token.price}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">Loading token prices...</p>
        )}
      </div>
    </div>
  );
};

export default TokenList;
