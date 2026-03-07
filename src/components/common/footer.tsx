import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/common/theme-toggle";
import { Button } from "../ui/button";

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "Github", href: "https://github.com" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto w-full">
      <Separator />

      <div className="flex items-center justify-between px-6 py-6 container mx-auto">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Pasanaku.</p>

        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            {socialLinks.map((link, i) => (
              <span key={link.label} className="inline-flex items-center gap-1">
                {i > 0 && <span aria-hidden>·</span>}
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="link" size="sm">
                    {link.label}
                  </Button>
                </a>
              </span>
            ))}
          </nav>

          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
