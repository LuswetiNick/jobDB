import SubmitButton from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth, signIn } from "@/utils/auth";
import { BriefcaseBusiness } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }
  return (
    <section className="h-screen grid place-items-center px-4">
      <div className="space-y-4">
        <div className="w-full text-center">
          <Link
            href="/"
            className="flex items-center justify-center font-medium text-2xl"
          >
            <BriefcaseBusiness className="mr-2" />
            Job<span className="text-muted-foreground">DB.</span>
          </Link>
        </div>
        <Card className="w-[350px]">
          <CardHeader className="text-center">
            <CardTitle>Welcome back!</CardTitle>
            <CardDescription>Login to you account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", {
                    redirectTo: "/onboarding",
                  });
                }}
              >
                <SubmitButton
                  text="Login with Google"
                  icon={
                    <Image
                      src="/google.svg"
                      alt="google"
                      height={20}
                      width={20}
                    />
                  }
                />
              </form>
              <form
                action={async () => {
                  "use server";
                  await signIn("github", {
                    redirectTo: "/onboarding",
                  });
                }}
              >
                <SubmitButton
                  text="Login with Github"
                  icon={
                    <Image
                      src="/github.svg"
                      alt="github"
                      height={20}
                      width={20}
                    />
                  }
                />
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default Login;
