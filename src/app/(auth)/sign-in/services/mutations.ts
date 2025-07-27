"use server";

import { signIn as nextAuthSignIn, signOut as authSignOut } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";
import { SignInSchema, signInSchema } from "../types/signInSchema";

const signIn = async (data: SignInSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = signInSchema.parse(data);
      await nextAuthSignIn("credentials", validatedData);
    },
  });
};

const signOut = () => {
  return executeAction({
    actionFn: authSignOut,
  });
};

export { signIn, signOut };
