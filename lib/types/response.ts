/*
The types specified here are used to ensure end to end type safety of successful responses

ApiPostsIdReactions

*/

import { Reaction, Reactions } from "@prisma/client";

type ReactionsTypeCount = { [key in Reactions | "reactions"]: number };

export interface ApiPostsIdReactions {
  reactions: Reaction[];
  _count: ReactionsTypeCount;
}
