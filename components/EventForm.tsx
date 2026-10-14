"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import { Field, FieldGroup } from "@/components/ui/field";

import { eventModes } from "@/lib/constants";
import { eventFormSchema } from "@/FormSchema";
import FileUploadInput from "./inputs/FileUploadInput";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import TextField from "./inputs/TextField";
import SelectField from "./inputs/SelectField";
import TextAreaField from "./inputs/TextAreaField";

const EventForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      overview: "",
      venue: "",
      location: "",
      date: "",
      time: "",
      audience: "",
      organizer: "",
      mode: "",
      agenda: "",
      tags: "",
      image: [],
    },
  });

  const handleAddEvent = async (data: z.infer<typeof eventFormSchema>) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" || key === "agenda" || key === "tags") return;
        if (value === undefined || value === null) return;
        formData.append(key, String(value));
      });
      const file = data.image?.[0];
      if (!(file instanceof File)) throw new Error("Please select an image");
      formData.append("image", file);

      const toList = (s: string) =>
        s
          .split("|")
          .map((x) => x.trim())
          .filter(Boolean);

      formData.append("agenda", JSON.stringify(toList(data.agenda)));
      formData.append("tags", JSON.stringify(toList(data.tags)));

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
        method: "POST",
        body: formData,
      });

      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImageChange = useCallback(
    (files: File[]) => {
      form.setValue("image", files, { shouldValidate: true });
    },
    [form],
  );
  return (
    <section className="w-full sm:max-w-7xl mx-auto bg-dark-100/50 rounded-lg p-4 backdrop-filter backdrop-blur-xl card-shadow">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleAddEvent)}>
        <FieldGroup>
          <div className="grid md:gap-2 gap-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  id="event-title"
                  label="Title"
                  placeholder="Enter Event Title e.g: Developer Conference"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  {...field}
                  className="lg:col-span-3 md:col-span-2 col-span-1"
                />
              )}
            />
            <Controller
              name="mode"
              control={form.control}
              render={({ field, fieldState }) => (
                <SelectField
                  name={field.name}
                  handleChange={field.onChange}
                  value={field.value}
                  label="Mode"
                  options={eventModes}
                  id="event-mode"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="grid md:gap-2 gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
            <Controller
              name="venue"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  id="event-venue"
                  label="Venue"
                  placeholder="Enter Event Venue e.g: Apple Campus"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  id="event-location"
                  label="Location"
                  placeholder="Enter Event Location e.g: New York"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  id="event-date"
                  label="Date"
                  placeholder="Enter Event Date e.g: 25-05-2026"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="time"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextField
                  id="event-time"
                  label="Time"
                  placeholder="Enter Event Time e.g: 08:30"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid md:gap-2 gap-4 md:grid-cols-2 grid-cols-1">
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextAreaField
                  id="event-description"
                  label="Description"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  maxChars={1000}
                  {...field}
                />
              )}
            />

            <Controller
              name="overview"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextAreaField
                  id="event-overview"
                  label="Overview"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  maxChars={500}
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid md:gap-2 gap-4 md:grid-cols-2 grid-cols-1">
            <Controller
              name="audience"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextAreaField
                  id="event-audience"
                  label="Audience"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  maxChars={1000}
                  {...field}
                />
              )}
            />

            <Controller
              name="organizer"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextAreaField
                  id="event-organizer"
                  label="Organizer"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  maxChars={500}
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid md:gap-2 gap-4 md:grid-cols-2 grid-cols-1">
            <Controller
              name="agenda"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextAreaField
                  id="event-agenda"
                  label="Agenda"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  maxChars={1000}
                  fieldDescription="Please Sperate Each Item by |"
                  {...field}
                />
              )}
            />

            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <TextAreaField
                  id="event-tags"
                  label="Tags"
                  invalid={fieldState.invalid}
                  error={fieldState.error?.message}
                  maxChars={500}
                  fieldDescription="Please Sperate Each Item by |"
                  {...field}
                />
              )}
            />
          </div>

          <FileUploadInput
            label="Image"
            handleChange={handleImageChange}
            invalid={form.getFieldState("image").invalid}
            error={
              form.formState.isSubmitted
                ? form.formState.errors.image?.message
                : undefined
            }
          />
        </FieldGroup>
      </form>
      <Field orientation="horizontal" className="mt-4">
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          form="form-rhf-demo"
          className="px-8 py-4 rounded-lg cursor-pointer transition-colors duration-150 bg-primary hover:bg-blue"
        >
          Submit
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="px-8 py-4 rounded-lg cursor-pointer transition-colors duration-150 bg-dark-200 hover:bg-dark-100 border-dark-200"
        >
          Reset
        </Button>
      </Field>
    </section>
  );
};

export default EventForm;
