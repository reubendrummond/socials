import { Prisma } from "@prisma/client";

export const customers: Prisma.UserCreateInput[] = [
  {
    email: "testy1@gmail.com",
    name: "Testy Test",
    age: 69,
    title: "Lord",
  },
  {
    email: "jack@russel.com",
    name: "Jack Russel",
    age: 17,
    title: "Mr",
  },
];
