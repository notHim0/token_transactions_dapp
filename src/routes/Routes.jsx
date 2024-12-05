import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import { ExchangeToken } from "../components/ExchangeToken";
import { RootLayout } from "../layout/RootLayout";
import { SendTokens } from "../components/SendTokens";
import TokenSwap from "../components/TokenSwap";
import CreateToken from "../components/CreateToken";
import { ShowBalance } from "../components/GetUserBalance";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="get_user_balance" element={<ShowBalance />} />w
      <Route path="/send_tokens" element={<SendTokens />} />
      <Route path="/token_swap" element={<TokenSwap />} />
      <Route path="/create_token" element={<CreateToken />} />
    </Route>
  )
);
