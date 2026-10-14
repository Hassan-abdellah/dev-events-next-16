import * as z from "zod";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

const eventFormSchema = z.object({
  title: z
    .string()
    .min(5, "Event title must be at least 5 characters.")
    .max(100, "Event title must be at most 100 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(1000, "Description must be at most 1000 characters."),
  overview: z
    .string()
    .min(20, "Overview must be at least 20 characters.")
    .max(500, "Overview must be at most 1000 characters."),
  venue: z
    .string()
    .min(5, "Event Venue must be at least 5 characters.")
    .max(100, "Event Venue must be at most 100 characters."),
  location: z
    .string()
    .min(5, "Event Location must be at least 5 characters.")
    .max(100, "Event Location must be at most 100 characters."),
  date: z
    .string()
    .min(5, "Event Location must be at least 5 characters.")
    .max(100, "Event Location must be at most 100 characters."),
  time: z
    .string()
    .min(5, "Event Location must be at least 5 characters.")
    .max(100, "Event Location must be at most 100 characters."),
  audience: z
    .string()
    .min(5, "Event Location must be at least 5 characters.")
    .max(100, "Event Location must be at most 100 characters."),
  organizer: z.string().min(5, "Event Location must be at least 5 characters."),
  agenda: z.string().min(5, "Event Location must be at least 5 characters."),
  tags: z
    .string()
    .min(5, "Event Location must be at least 5 characters.")
    .max(100, "Event Location must be at most 100 characters."),

  mode: z
    .string()
    .min(1, "Please select your spoken language.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),

  image: z
    .array(
      z
        .custom<File>((v) => v instanceof File, "Invalid file")
        .refine((f) => f.size <= MAX_SIZE, "Max size is 10MB")
        .refine(
          (f) => ACCEPTED_TYPES.includes(f.type),
          "Only JPG, PNG allowed",
        ),
    )
    .min(1, "Please upload at least one image"),
});

export { eventFormSchema };
