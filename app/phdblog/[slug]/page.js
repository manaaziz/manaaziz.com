import { notFound } from "next/navigation";
import PostContent from "@/components/PostContent";
import { getLegacyPost, getSeriesPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getSeriesPosts("becoming-dr-mana").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getLegacyPost("phdblog", slug);
  return {
    title: post?.title || "Becoming Dr. Mana"
  };
}

export default async function LegacyPhdPostPage({ params }) {
  const { slug } = await params;
  const post = getLegacyPost("phdblog", slug);

  if (!post) notFound();

  return <PostContent post={post} />;
}
