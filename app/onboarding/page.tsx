import OnboardingForm from "@/components/forms/onboarding/onboarding-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/utils/require-user";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function chechUserFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });
  if (user?.onboardingCompleted === true) return redirect("/");

  return user;
}

const Onboarding = async () => {
  const session = await requireUser();

  await chechUserFinishedOnboarding(session.id as string);
  return (
    <section className="min-h-screen grid place-items-center p-4">
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
        <Card className="w-[500px]">
          <CardHeader className="text-center">
            <CardTitle>Let&apos;s get you set up!</CardTitle>
          </CardHeader>
          <CardContent>
            <OnboardingForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default Onboarding;
