import { client } from "@/sanity/lib/client";
import { featuredProductsQuery } from "@/sanity/lib/queries";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

export async function FeaturedProducts() {
  const products = await client.fetch<Product[]>(featuredProductsQuery);

  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="font-serif text-4xl italic text-on-light">Featured Products</h2>
          <p className="max-w-xl font-sans text-on-light/70">
            A selection of our retort-ready favorites, made for foodservice at scale.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center font-sans text-on-light/60">
            Our product catalog is coming soon.
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <Button variant="secondary" href="/products">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
