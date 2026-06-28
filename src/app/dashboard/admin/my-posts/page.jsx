// app/dashboard/trainer/my-posts/page.js
import MyForumPosts from "@/components/forum/MyForumPosts";
import { GetMyForumPosts } from "@/lib/api/forumPostActions";
import { GetUserSession } from "@/lib/core/session";

export default async function TrainerPost({ searchParams }) {
  const session = await GetUserSession();
  const email = session?.email;
  const role = session?.role;

  const page = parseInt(searchParams.page) || 1;
  const search = searchParams.search || "";

  const initialData = await GetMyForumPosts(email, page, 9, search);

  return (
    <MyForumPosts
      initialData={initialData}
      trainerEmail={email}
      initialPage={page}
      initialSearch={search}
      role={role}
    />
  );
}
