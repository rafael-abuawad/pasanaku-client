import { useState } from "react";

import { ConnectKitButton } from "connectkit";
import { Menu, Wallet, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex w-full items-center justify-between px-6 py-4 container mx-auto">
        <Link to="/" className="font-brand text-2xl tracking-wide">
          Pasanaku
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          <Button variant="link" size="sm" asChild>
            <Link to="/">Dashboard</Link>
          </Button>
          <Button variant="link" size="sm" asChild>
            <Link to="/create">Create</Link>
          </Button>
          <ConnectKitButton.Custom>
            {({ isConnected, isConnecting, show, truncatedAddress, ensName }) => (
              <Button onClick={show} disabled={isConnecting} size="sm">
                <Wallet className="size-4" />
                {isConnecting
                  ? "Connecting..."
                  : isConnected
                    ? (ensName ?? truncatedAddress)
                    : "Connect Wallet"}
              </Button>
            )}
          </ConnectKitButton.Custom>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ConnectKitButton.Custom>
            {({ isConnected, isConnecting, show, truncatedAddress, ensName }) => (
              <Button onClick={show} disabled={isConnecting} size="sm">
                <Wallet className="size-4" />
                {isConnecting
                  ? "Connecting..."
                  : isConnected
                    ? (ensName ?? truncatedAddress)
                    : "Connect Wallet"}
              </Button>
            )}
          </ConnectKitButton.Custom>
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-nav"
          role="navigation"
          aria-label="Main navigation"
          className="md:hidden border-t bg-background px-6 py-2 flex flex-col"
        >
          <Button variant="link" size="sm" className="justify-start" asChild>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </Link>
          </Button>
          <Button variant="link" size="sm" className="justify-start" asChild>
            <Link to="/create" onClick={() => setIsMobileMenuOpen(false)}>
              Create
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
