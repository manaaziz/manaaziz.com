import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import { getLegacyPost, getSeriesPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getSeriesPosts("europe-2023").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getLegacyPost("EUblog", slug);
  return {
    title: post?.title || "Europe 2023"
  };
}

export default async function LegacyEuropePostPage({ params }) {
  const { slug } = await params;
  const post = getLegacyPost("EUblog", slug);

  if (!post) notFound();

  return <PostContent post={post} />;
}
