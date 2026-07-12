import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, allPostsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { JsonLd } from "@/components/JsonLd";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Post } from "@/types";

export async function generateStaticParams() {
  const posts = await client.fetch<Post[]>(allPostsQuery);
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });

  if (!post) return {};

  const title = post.seoTitle || `${post.title} | Chefs Base LLP`;
  const description = post.seoDescription || post.excerpt;
  const image = post.mainImage
    ? urlForImage(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    ...(post.mainImage
      ? { image: urlForImage(post.mainImage).width(1200).height(675).url() }
      : {}),
    ...(post.author?.name ? { author: { "@type": "Person", name: post.author.name } } : {}),
  };

  return (
    <article className="px-6 py-20">
      <JsonLd data={articleJsonLd} />
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="font-sans text-xs uppercase tracking-wide text-muted">
            {formatDate(post.publishedAt)}
            {post.readTime ? ` · ${post.readTime} min read` : ""}
          </span>
          <h1 className="font-serif text-5xl italic text-on-light">{post.title}</h1>
          {post.author?.name && (
            <span className="font-sans text-sm text-on-light/70">
              By {post.author.name}
              {post.author.role ? `, ${post.author.role}` : ""}
            </span>
          )}
        </div>

        {post.mainImage && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl bg-surface-alt">
            <SanityImage
              src={urlForImage(post.mainImage).width(1200).height(675).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.body && (
          <div className="prose prose-lg max-w-none font-sans text-on-light/80">
            <PortableText value={post.body} />
          </div>
        )}
      </div>
    </article>
  );
}
