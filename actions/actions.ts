"use server";

import { z } from "zod";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { companySchema } from "@/utils/zod-schemas";
import { prisma } from "@/lib/db/prisma";

// Create company
export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/auth/login");
  }
  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: { ...validateData },
      },
    },
  });

  return redirect("/");
}
