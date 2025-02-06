"use client";
import { jobSeekerSchema } from "@/utils/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { createJobSeeker } from "@/actions/actions";

import pdfIcon from "@/public/pdf.svg";

const JobSeekerForm = () => {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: "",
      about: "",
      resume: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof jobSeekerSchema>) => {
    try {
      setPending(true);
      await createJobSeeker(data);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.error("Something went wrong");
      }
    } finally {
      setPending(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Short bio"
                  cols={4}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className="relative w-fit flex items-center justify-center">
                      <Image
                        src={pdfIcon}
                        width={100}
                        height={100}
                        className="rounded-md"
                        alt="Pdf"
                      />

                      <Button
                        type="button"
                        className="absolute -top-2 -right-2"
                        onClick={() => field.onChange("")}
                        size="icon"
                        variant="destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      className="ut-button:bg-primary ut-button:hover:bg-primary/90 ut-button:text-primary-foreground ut-label:text-muted-foreground border-primary"
                      endpoint="resumeUploader"
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                      }}
                      onUploadError={() => {
                        console.log("Something went wrong");
                      }}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Creating ...</span>
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Form>
  );
};
export default JobSeekerForm;
