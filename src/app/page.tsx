import { SignInButton, SignOutButton, auth, currentUser } from "@clerk/nextjs";

import { api } from "~/trpc/server";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { RouterOutputs } from "~/trpc/shared";
import Image from "next/image";

dayjs.extend(relativeTime);

const CreatePostWizard = async () => {
  const user = await currentUser();
  // if (!userId) {
  //   return null;
  // }
  // console.log(user);
  return (
    <div className="flex w-full gap-3">
      <Image
        src={user?.imageUrl}
        alt={`Profile Image`}
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type some topics!"
        className=" grow bg-transparent outline-none"
      />
    </div>
  );
};
type PostWithUser = RouterOutputs["post"]["getAll"][number];

interface PostViewProps {
  posts: PostWithUser;
}

const PostView = ({ posts }: PostViewProps) => {
  const { post, author } = posts;
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.imageUrl}
        alt="author image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex gap-2 font-bold text-slate-300">
          <span>{`@${author.username}`}</span>
          <span className="font-thin">{` · ${dayjs(post.createdAt).fromNow()} `}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

export default async function Home() {
  const { userId } = auth();
  const data = await api.post.getAll.query();
  return (
    <main className="flex h-screen justify-center">
      <div className="boreder-slate-400 w-full border-x md:max-w-2xl">
        <div className="border-b border-slate-400 p-4">
          {" "}
          {!userId && (
            <div className="flex justify-center">
              <SignInButton />
            </div>
          )}{" "}
          {!!userId && <CreatePostWizard />}{" "}
        </div>
        <div className="flex flex-col">
          {data.map((fullpost, index) => (
            <PostView key={index} posts={fullpost} />
          ))}
        </div>
      </div>
    </main>
  );
}
