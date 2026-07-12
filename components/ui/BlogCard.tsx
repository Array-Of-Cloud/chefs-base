import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Post } from "@/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-surface-alt">
        {post.mainImage && (
          <SanityImage
            src={urlForImage(post.mainImage).width(600).height(340).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-sans text-xs text-on-light/60">
          {formatDate(post.publishedAt)}
          {post.readTime ? ` · ${post.readTime} min read` : ""}
        </span>
        <h3 className="font-serif text-2xl italic text-on-light">{post.title}</h3>
        <p className="font-sans text-sm text-on-light/70">{post.excerpt}</p>
      </div>
    </Link>
  );
}
