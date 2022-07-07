import { Prisma } from "@prisma/client";

export const users: Prisma.UserCreateInput[] = [
  {
    uid: "bot1",
    name: "Testy Test",
    title: "Lord",
  },
  {
    uid: "bot2",
    name: "Jack Russel",
    title: "Mr",
  },
];
