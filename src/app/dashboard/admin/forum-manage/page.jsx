import ForumPostManage from "@/components/dashboard/admin/ForumPostManage";
import { GetAllPosts } from "@/lib/api/forumPostActions";

export default async function ForumManage({ searchParams }) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams?.page) || 1;
  const search = resolvedParams?.search || "";

  const forumPosts = await GetAllPosts(page, 10, search);
  return <ForumPostManage initialData={forumPosts} />;
}