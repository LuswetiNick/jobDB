"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface SubmitButtonProps {
  text: string;
  icon?: ReactNode;
}

const SubmitButton = ({ text, icon }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin h-4 w-4" />
          <span>Signing in...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
};
export default SubmitButton;
