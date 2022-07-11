import { StandardResponse } from "@lib/types/backend";
import { NextApiRequest, NextApiResponse } from "next";

type ApiHandler<M extends Middleware<any>[] = []> =
  | {
      middleware: M;
      handler: Handler<StandardResponse, M>;
    }
  | Handler<StandardResponse, []>;

// const m: Middleware<{[key: string]: any}>[] = [(req) => {
//     return {}
// }]

// type ApiHandler<T , M = Middleware<T>[]> =
//    {
//       middleware: M;
//       handler: Handler<StandardResponse, M>;
//     }
//   | Handler<StandardResponse, []>;

type Middleware<R extends {} = {}> = keyof R extends never
  ? (req: NextApiRequest) => { [key: string]: never }
  : (req: NextApiRequest) => R;
// type InferReturn<M extends Middleware<{}>, R = ReturnType<M>> = {
//   [K in keyof R]: R[K];
// };

type Handler<Res, M extends Middleware<any>[]> = (
  req: NextApiRequest & MiddlewareToProperties<M>,
  res: NextApiResponse<Res>
) => unknown | Promise<unknown>;

const m1: Middleware<{ username: string }> = (req) => {
  const t = {
    username: "Reuben",
  };
  return t;
};

const m2: Middleware<{ age: number }> = (req) => {
  const t = {
    age: 69,
  };
  return t;
};

const m3: Middleware = (req) => {
  const t = {
    age: 69,
  };
  return {};
};

const mArr = [m1, m2, m3];

type GetElements<T extends Middleware<any>[]> = T[number];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type MiddlewareToProperties<M extends Middleware<any>[]> = UnionToIntersection<
  Exclude<ReturnType<GetElements<M>>, { [key: string]: never }>
>;
// 1. get each element
// 2. get the return type of the element
// 3. exlude empty objects
// 4. convert the union to an intersection
type T = MiddlewareToProperties<typeof mArr>;

const a: ApiHandler<typeof mArr> = {
  middleware: mArr,
  handler: (req, res) => {
    return res.status(200).json({
      success: true,
      data: "yoyo",
    });
  },
};

const M = [m1, m2, m3];

const h1: ApiHandler<typeof M> = {
  middleware: M,
  handler: (req, res) => {
    req.username;
    req.age;
  },
};

const h2: ApiHandler = (req, res) => {
  res.status(200).json({
    success: true,
    data: "well done",
  });
};

const a2: ApiHandler<(typeof m2 | typeof m3)[]> = {
  middleware: [m2, m3],
  handler: (req, res) => {
    req.age;
  },
};
