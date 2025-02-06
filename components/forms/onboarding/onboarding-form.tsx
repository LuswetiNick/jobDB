"use client";
import { useState } from "react";
import UserTypeSelection from "./user-type";
import CompanyForm from "./company-form";
import JobSeekerForm from "./job-seeker-form";

type UserType = "company" | "jobSeeker" | null;

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setStep(2);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelection} />;

      case 2:
        return userType === "company" ? <CompanyForm /> : <JobSeekerForm />;
      default:
        return null;
    }
  };

  return (
    <section>
      <div className="w-full">{renderStep()}</div>
    </section>
  );
};
export default OnboardingForm;
