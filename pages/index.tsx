import MainLayout from "layouts/MainLayout";
import { CustomNextPage } from "@lib/types/page";
import { useSession } from "next-auth/react";
import { GetStaticProps } from "next";
import { Post } from "@prisma/client";
import PostItem from "@components/Feed/PostItem";
import prisma from "@prisma";
import Link from "next/link";
import { SIGNIN_PAGE } from "@lib/constants";

interface HomeProps {
  posts: Post[];
}

const Home: CustomNextPage<HomeProps> = ({ posts }) => {
  const { data: session } = useSession();

  return (
    <MainLayout className="flex flex-col items-center gap-y-4">
      <h1>Lightning Socials</h1>
      <div className="flex flex-col gap-y-2 w-full max-w-md justify-center">
        <h3>Featured posts</h3>
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
        {session ? (
          <Link href="/feed">
            <p className="self-center px-4 py-2 rounded-md bg-primary hover:cursor-pointer hover:opacity-80">
              Go to feed
            </p>
          </Link>
        ) : (
          <div>
            <Link href={SIGNIN_PAGE}>
              <span className="font-bold text-primary hover:cursor-pointer">
                Sign in
              </span>
            </Link>{" "}
            to see more
          </div>
        )}
      </div>
    </MainLayout>
  );
};

Home.title = "Home";

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      _count: {
        select: {
          reactions: true,
          comments: true,
        },
      },
    },

    orderBy: {
      reactions: {
        _count: "desc",
      },
    },
    take: 3,
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
    revalidate: 300,
  };
};
