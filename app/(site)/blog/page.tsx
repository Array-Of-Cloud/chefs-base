import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { BlogCard } from "@/components/ui/BlogCard";
import type { Post } from "@/types";

export const metadata: Metadata = {
  title: "Journal | Chefs Base LLP",
  description: "Notes on Kerala cuisine, retort technology, and export foodservice.",
};

export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(allPostsQuery);

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h1 className="font-serif text-5xl italic text-on-light">The Journal</h1>
          <p className="max-w-xl font-sans text-on-light/70">
            Notes on Kerala cuisine, retort technology, and export foodservice.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center font-sans text-on-light/60">
            Our journal is coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
