// Create a new file, for example, "next-auth.d.ts"
// This file should be in a folder recognized by TypeScript (e.g., "types")

import { Role } from "@prisma/client";
import { Session } from "next-auth";

// Augment the Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: Role | null;
    };
  }
}
