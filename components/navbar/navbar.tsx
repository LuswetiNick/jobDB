import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import { BriefcaseBusiness } from "lucide-react";
import { auth, signOut } from "@/utils/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="w-full bg-background border-b">
      <div className="mx-auto max-w-screen-xl  p-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link href="/" className="font-medium text-2xl flex items-center">
              <BriefcaseBusiness className="mr-2" />
              Job<span className="text-muted-foreground">DB.</span>
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
            {session?.user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button>Logout</Button>
              </form>
            ) : (
              <Button asChild>
                <Link href={"/auth/login"}>Get Started</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
