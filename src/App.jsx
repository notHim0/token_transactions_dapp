import React from "react";
import ContextWrapper from "./components/wallet/ContextWrapper";
import "@solana/wallet-adapter-react-ui/styles.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";

function App() {
  return (
    <ContextWrapper>
      <RouterProvider router={routes} />
    </ContextWrapper>
  );
}

export default App;
