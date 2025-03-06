import fetch from "cross-fetch";

const API_KEY = import.meta.env.VITE_COINAPI_API_KEY;
const BASE_URL = "https://rest.coinapi.io/v1/exchangerate/USD";
const tokens = ["BTC", "ETH", "SOL", "DOGE", "USDC", "RAY", "BONK", "JTO"];

export async function fetchRates() {
  try {
    const filter = tokens.join(",");
    const response = await (
      await fetch(`${BASE_URL}?filter_asset_id=${filter}`, {
        headers: { "X-CoinAPI-Key": API_KEY },
      })
    ).json();

    const rates = response.rates.map((rate) => {
      return { token: rate.asset_id_quote, price: (1 / rate.rate).toFixed(8) };
    });

    return rates;
  } catch (e) {
    console.log(e);
  }
}
