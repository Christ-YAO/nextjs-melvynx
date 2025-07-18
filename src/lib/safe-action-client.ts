import { createSafeActionClient } from "next-safe-action";

export class SafeError extends Error {
  constructor(error: string) {
    super(error);
  }
}

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof SafeError) {
      return error.message;
    }

    return "Something went wrong !";
  },
});
