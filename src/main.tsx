import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./providers/theme-provider";
import { Web3Provider } from "./providers/web3-provider";
import { TooltipProvider } from "./components/ui/tooltip";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Web3Provider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </Web3Provider>
    </ThemeProvider>
  </StrictMode>,
);
