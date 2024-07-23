import Link from "next/link";
import { NavDropdown } from "./NavDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";
import UserDropdownMenu from "./UserDropdownMenu";
import { DotPattern } from "../ui/DotPattern";
import { cn } from "@/lib/utils";
import PrimaryLogo from "./logo/primaryLogo";
// import { Pixelify_Sans } from "next/font/google";

// const pixelify_Sans = Pixelify_Sans({
//   weight: ["400"],
//   subsets: [],
// });

function Navbar() {
  return (
    <nav className="fixed left-0 top-0 flex-between border-b-4 border-border p-4 inset-x-0 w-full bg-card/90 dark:bg-background/90 backdrop-blur-lg z-50 md:flex">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(4300px_circle_at_center,accent,transparent)] z-0"
        )}
      />
      <div className="mx-auto flex w-[1300px] max-w-full items-center justify-between">
        {/* <MobileDrawer /> */}

        <div className="flex-between">
          {/* <Link
            className={cn(
              "m500:text-xl w-full m900:w-[unset] font-heading text-2xl",
              pixelify_Sans.className,
              "dark:bg-gradient-to-b dark:from-primary dark:to-card dark:text-transparent dark:bg-clip-text"
            )}
            
            href={"/"}
          >
            <span className="font-bold">&#62;&#62;</span>
            <span className="font-semibold">prima</span>
            <span
              className={cn(
                "bg-gradient-to-b from-primary to-foreground dark:to-card text-transparent bg-clip-text",
                "font-semibold"
              )}
            >
              LEVELING
            </span>
          </Link> */}
          <PrimaryLogo />
        </div>

        <div className="flex items-center gap-10 m1000:hidden">
          <NavDropdown />

          {/* <Link className="text-xl font-base" href="/templates">
            Templates
          </Link> */}
        </div>

        <div className="flex w-[200px] items-center justify-end gap-5 m800:w-[unset] m400:gap-3">
          <ThemeSwitcher />

          <UserDropdownMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
