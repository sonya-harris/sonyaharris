import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logoAssetUrl from "@/assets/SH.PNG";

export function SiteLayout({
  children,
  showAboutLink = true,
}: {
  children: ReactNode;
  showAboutLink?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header showAboutLink={showAboutLink} />
      <main className="fade-in">{children}</main>
      <Footer />
    </div>
  );
}

function Header({ showAboutLink }: { showAboutLink: boolean }) {
  const logoSrc = logoAssetUrl;
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="px-4 pt-6 pb-2 sm:px-6 sm:pt-3 lg:px-7">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between">
        <Link to="/" className="block" aria-label="Home">
          <img src={logoSrc} alt="Sonya Harris" className="h-14 w-auto sm:h-16 lg:h-20" />
        </Link>
        {showAboutLink && (
          <nav className=" self-start mt-3 flex items-center gap-4 text-[14px] font-bold uppercase tracking-[-0.03em] text-black">
            {!isHome && (
              <Link to="/" className="transition-colors hover:text-[#777777]">
                Home
              </Link>
            )}
            <Link
              to="/"
              hash="about"
              className="transition-colors hover:text-[#777777]"
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

function Footer() {
  const [open, setOpen] = useState(false);
  return (
<footer className="mt-20 h-20 px-4 pb-8 pt-6 sm:px-6 lg:px-7 flex">
  <div className="flex w-full max-w-[1600px] justify-end items-end mt-8">
    <p className="text-[12px] font-bold uppercase tracking-[-0.03em] text-black">
      © {new Date().getFullYear()} Sonya Harris
    </p>
  </div>
</footer>
  );
}
