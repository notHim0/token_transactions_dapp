import React from "react";
import { fetchRates } from "./tokens/tokenPriceList";

const TokenList = async () => {
  const tokens = await fetchRates();
  return (
    <div className="absolute card mt-20 max-w-5xl left-1/2 transform -translate-x-1/2 w-full">
      <h2 className="text-xl font-bold text-white mb-6">Token Prices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokens.map((token) => (
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
        ))}
      </div>
    </div>
  );
};

export default TokenList;
