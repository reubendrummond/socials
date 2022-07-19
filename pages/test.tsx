import { PostsData } from "@lib/api/validation/responses";
import { ValidateJsonResponse } from "@lib/clientValidation";
import { useGetPost, useGetPosts, useGetReactions } from "@lib/fetchers";
import { useReq } from "@lib/hooks/useReq";
import { trpc } from "@lib/tprc";
import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const Test = () => {
  // useEffect(() => {
  //   fetch("/api/posts/dfgsdfgsdf")
  //     .then((res) => res.json())
  //     .then(async (r) => {
  //       const v = await ValidateJsonResponse(r, PostsData);
  //       if (v.success) {
  //         setPosts(v.data.posts);
  //       } else {
  //         console.log(v.error);
  //       }
  //     })
  //     .catch(console.error);
  // });

  const { data: postData, error } = useGetPost(3);
  const post = postData?.post;
  const { data: postsData } = useGetPosts();

  const { data: reactionsData } = useGetReactions(2);

  const test = trpc.useQuery(["users.all"]);
  // const test = trpc.useQuery([
  //   "users.username",
  //   { username: "reubendrummondd" },
  // ]);

  return (
    <div>
      {post ? (
        <div key={post.id}>
          <h2>id: {post.id}</h2>
          <p>user id: {post.userId}</p>
          <p>{post.body}</p>
          <p>Reactions: {post._count.reactions}</p>
        </div>
      ) : (
        error && <p>Not found</p>
      )}
      <pre>{JSON.stringify(reactionsData?._count, null, 4)}</pre>
      {/* {postsData?.posts.map((post) => (
        <pre key={post.id}>{JSON.stringify(post, null, 4)}</pre>
      ))} */}
      <pre>{JSON.stringify(test, null, 4)}</pre>
    </div>
  );
};

export default Test;
