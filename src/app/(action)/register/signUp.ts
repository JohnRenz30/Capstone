"use server";

import { FormSchema } from "@/app/(auth)/_components/sign-in-form";
import { db } from "@/lib/db/db";
import { z } from "zod";
import bcrypt from "bcryptjs";

type Input = z.infer<typeof FormSchema>;
export const register = async (values: Input) => {
  const user = await db.user.findFirst({
    where: {
      email: values.email,
    },
  });

  if (user) {
    return { error: "User with that Email already exists!" };
  }

  const passHash = bcrypt.hashSync(values.password, 10);
  try {
    await db.user.create({
      data: {
        email: values.email,
        hashedPass: passHash,
        username: values.email,
      },
    });
    return { message: "Success" };
  } catch (error) {
    return { error: error };
  }
};
