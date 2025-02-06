"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { companySchema, jobSeekerSchema } from "@/utils/zod-schemas";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/utils/require-user";

// Create company
export async function createCompany(data: z.infer<typeof companySchema>) {
  const user = await requireUser();

  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: user.id,
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

// create job seeker
export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();
  const validateData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: { ...validateData },
      },
    },
  });
  return redirect("/");
}
