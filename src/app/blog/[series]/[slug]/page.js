import { notFound } from "next/navigation";
import PostContent from "@/components/post_content";
import { getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts()
    .filter((post) => post.routeHref.startsWith("/blog/"))
    .map((post) => ({
      series: post.seriesSlug,
      slug: post.slug
    }));
}

export async function generateMetadata({ params }) {
  const { series, slug } = await params;
  const post = getPost(series, slug);
  const routeHref = `/blog/${series}/${slug}`;

  if (!post) {
    return { title: "Blog post" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: post.canonicalHref || post.href },
    robots: post.canonicalHref && post.canonicalHref !== routeHref
      ? { index: false, follow: true }
      : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: post.canonicalHref || post.href,
      publishedTime: post.date || undefined,
      images: post.previewImage ? [{ url: post.previewImage, alt: post.title }] : []
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { series, slug } = await params;
  const post = getPost(series, slug);

  if (!post) notFound();

  return <PostContent post={post} />;
}
