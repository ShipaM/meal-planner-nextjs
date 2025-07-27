"use server";

import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { hashPassword } from "@/lib/utils";
import { signUpSchema, SignUpSchema } from "../types/signUpSchema";

const signUp = async (data: SignUpSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = signUpSchema.parse(data);
      const hashedPassword = await hashPassword(validatedData.password);

      await db.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          password: hashedPassword,
        },
      });
    },
  });
};

export { signUp };
