"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { eventModes } from "@/lib/constants";
import { eventFormSchema } from "@/FormSchema";
import FileUploadInput from "./inputs/FileUploadInput";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
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
    <section className="w-full sm:max-w-7xl mx-auto">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleAddEvent)}>
        <FieldGroup>
          <div className="grid gap-2 grid-cols-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="col-span-3">
                  <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="mode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-select-mode">Mode</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-mode"
                      aria-invalid={fieldState.invalid}
                      className="min-w-30"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectSeparator />
                      {eventModes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value}>
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid gap-2 grid-cols-4">
            <Controller
              name="venue"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-venue">Venue</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-venue"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-location">
                    Location
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-location"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-date">Date</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-date"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="time"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-time">Time</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-time"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid gap-2 grid-cols-2">
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/1000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="overview"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-overview">
                    Overview
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-overview"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid gap-2 grid-cols-2">
            <Controller
              name="audience"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-audience">
                    Audience
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-audience"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/1000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="organizer"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-organizer">
                    Organizer
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-organizer"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid gap-2 grid-cols-2">
            <Controller
              name="agenda"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-agenda">Agenda</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-agenda"
                      placeholder="at 8:00 Start the Event | at 8:15 Meet with the CEO | at 8:30 Gathering"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/1000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Please Sperate Each Item by |
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-tags">Tags</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-tags"
                      placeholder="AI | Cloud | Developing"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Please Sperate Each Item by |
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>

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
      </form>
      <Field orientation="horizontal">
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          form="form-rhf-demo"
          className="px-8 py-4 rounded-lg cursor-pointer transition-colors duration-150"
        >
          Submit
        </Button>

        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
      </Field>
    </section>
  );
};

export default EventForm;
