import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAiReportChema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
  year: z.string().refine((value) => isMatch(value, "yyyy")),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportChema>;