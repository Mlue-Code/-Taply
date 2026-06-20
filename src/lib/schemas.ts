import { z } from "zod";

export const CreateFeedbackSchema = z.object({
  designId: z
    .string({
      required_error: "designId is required",
      invalid_type_error: "designId must be a string",
    })
    .min(1, "designId cannot be empty")
    .trim(),
  comment: z
    .string({
      required_error: "comment is required",
      invalid_type_error: "comment must be a string",
    })
    .min(1, "comment cannot be empty")
    .max(500, "comment must be 500 characters or less")
    .trim(),
  x: z
    .number({
      required_error: "x coordinate is required",
      invalid_type_error: "x must be a number",
    })
    .min(0, "x must be between 0 and 1")
    .max(1, "x must be between 0 and 1"),
  y: z
    .number({
      required_error: "y coordinate is required",
      invalid_type_error: "y must be a number",
    })
    .min(0, "y must be between 0 and 1")
    .max(1, "y must be between 0 and 1"),
});

export type CreateFeedbackInput = z.infer<typeof CreateFeedbackSchema>;

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

/**
 * Validates feedback data.
 *
 * @param data - Raw data received from the request.
 * @returns Validation result indicating success or any validation errors.

 */
export function validateFeedback(
  data: unknown,
): ValidationResult<CreateFeedbackInput> {
  const result = CreateFeedbackSchema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  const errors = result.error.issues.map((issue) => {
    const field = issue.path.join(".");
    return field ? `${field}: ${issue.message}` : issue.message;
  });

  return {
    success: false,
    errors,
  };
}
