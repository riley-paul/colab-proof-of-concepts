import { defineAction } from "astro:actions";
import { z } from "zod";
import { faker } from "@faker-js/faker";
import type { User } from "./types";
import { v4 as uuid } from "uuid";

const TOTAL_USERS = 1000;

export const getRows = defineAction({
  input: z.object({
    page: z.number(),
    pageSize: z.number(),
  }),
  handler: async ({ page, pageSize }) => {
    const users: User[] = Array.from({ length: pageSize }, () => ({
      id: uuid(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
      isAdmin: faker.helpers.arrayElement([true, false]),
      isBlocked: faker.helpers.arrayElement([true, false]),
      isVerified: faker.helpers.arrayElement([true, false]),
    }));
    return {
      data: users,
      total: TOTAL_USERS,
    };
  },
});
