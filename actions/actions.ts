"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { companySchema, jobSeekerSchema } from "@/utils/zod-schemas";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/utils/require-user";
import arcjet, { detectBot, shield } from "@/utils/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  );

// Create company
export async function createCompany(data: z.infer<typeof companySchema>) {
  const user = await requireUser();
  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Denied");
  }

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
  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Denied");
  }

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
