import { Post, Prisma, Reaction, Reactions } from "@prisma/client";
import useSWR, { Fetcher, Key } from "swr";
import { ApiPostsIdReactions } from "./types/response";

// type T =  typeof await prisma.post.findFirst({
//     include: {
//         _count: {
//             select: {
//                 reactions: true,
//                 comments: true
//             }
//         },

//     },

// })

Prisma.validator<Prisma.PostCreateInput>();
type PostsResponse = Prisma.PostGetPayload<{
  include: {
    user: true;
    _count: {
      select: {
        comments: true;
        reactions: true;
      };
    };
  };
}>;

// export const getPostById: Fetcher<PostsResponse, string> = (
//   id
// ) =>
//   fetch(`/api/posts/${id}`)
//     .then((res) => res.json())
//     .then((data) => Prisma.validator<PostsResponse>()(data.data.post));

//     export const getPostFetcher: Fetcher<PostsResponse, [string, number]> = (
//       url, id
//     ) =>  fetch(`/api/posts/${id}`)
//         .then((res) => res.json())
//         .then((data) => Prisma.validator<PostsResponse>()(data.data.post));

type ReturnFetcher<Res extends {}> = (
  id: string | number
) => Fetcher<Res, string>;

const GlobalFetcher =
  <Res extends {}>(): Fetcher<Res, string> =>
  (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.data);
// .then((data) => Prisma.validator<Res>()(data.data));

export const useGetPost = (postId: number) => {
  return useSWR(
    `/api/posts/${postId}`,
    GlobalFetcher<{ post: PostsResponse }>()
  );
};

export const useGetPosts = () => {
  return useSWR("/api/posts", GlobalFetcher<{ posts: PostsResponse[] }>());
};

export const useGetReactions = (postId: number) => {
  return useSWR(
    `/api/posts/${postId}/reactions`,
    GlobalFetcher<ApiPostsIdReactions>()
  );
};
