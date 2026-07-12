import { client } from "@/sanity/lib/client";
import { featuredPostsQuery } from "@/sanity/lib/queries";
import { BlogCard } from "@/components/ui/BlogCard";
import { Button } from "@/components/ui/Button";
import type { Post } from "@/types";

export async function LatestPosts() {
  const posts = await client.fetch<Post[]>(featuredPostsQuery);

  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="font-serif text-4xl italic text-on-light">From the Journal</h2>
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

        <div className="mt-12 flex justify-center">
          <Button variant="secondary" href="/blog">
            Read the Journal
          </Button>
        </div>
      </div>
    </section>
  );
}
