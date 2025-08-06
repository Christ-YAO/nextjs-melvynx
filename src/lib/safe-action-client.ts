import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./auth-server";

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

export const actionUser = actionClient.use(async ({ next }) => {
  const user = await getUser();

  if (!user) {
    throw new SafeError("Invalid user");
  }

  return next({ ctx: { user } });
});
