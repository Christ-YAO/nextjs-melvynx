import { headers } from "next/headers";
import { auth } from "./auth";
import { LIMITATIONS } from "./auth-plan";
import { UserPlan } from "@prisma/client";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export const getUser = async () => {
  const session = await getSession();

  const user = session?.user;

  if (!user) {
    return undefined;
  }

  const limit = LIMITATIONS[user.plan as UserPlan];
  return { ...user, limit };
};
