import OnboardingForm from "@/components/forms/onboarding/onboarding-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

const Onboarding = () => {
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
