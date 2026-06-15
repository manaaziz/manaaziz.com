import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import { getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    series: post.seriesSlug,
    slug: post.slug
  }));
}

export async function generateMetadata({ params }) {
  const { series, slug } = await params;
  const post = getPost(series, slug);

  return {
    title: post?.title || "Blog post"
  };
}

export default async function BlogPostPage({ params }) {
  const { series, slug } = await params;
  const post = getPost(series, slug);

  if (!post) notFound();

  return <PostContent post={post} />;
}
