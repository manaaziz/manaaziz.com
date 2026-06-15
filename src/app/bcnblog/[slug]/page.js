import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import { getLegacyPost, getSeriesPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getSeriesPosts("barcelona").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getLegacyPost("bcnblog", slug);
  return {
    title: post?.title || "Americanito in Barcelona"
  };
}

export default async function LegacyBarcelonaPostPage({ params }) {
  const { slug } = await params;
  const post = getLegacyPost("bcnblog", slug);

  if (!post) notFound();

  return <PostContent post={post} />;
}
