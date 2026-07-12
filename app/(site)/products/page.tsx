import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allProductsQuery, allCategoriesQuery } from "@/sanity/lib/queries";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product, Category } from "@/types";

export const metadata: Metadata = {
  title: "Products | Chefs Base LLP",
  description:
    "Retort-ready Kerala cuisine for international restaurant and foodservice buyers.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    client.fetch<Product[]>(allProductsQuery),
    client.fetch<Category[]>(allCategoriesQuery),
  ]);

  const filteredProducts = category
    ? products.filter((product) => product.category?.slug?.current === category)
    : products;

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h1 className="font-serif text-5xl italic text-on-light">Our Products</h1>
          <p className="max-w-xl font-sans text-on-light/70">
            Retort-ready Kerala cuisine, made for restaurant and foodservice buyers
            worldwide.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className={`rounded-xl border px-4 py-2 font-sans text-sm transition-colors ${
                !category
                  ? "border-primary bg-primary text-on-dark"
                  : "border-border text-on-light/70 hover:border-accent hover:text-accent"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat.slug.current}`}
                className={`rounded-xl border px-4 py-2 font-sans text-sm transition-colors ${
                  category === cat.slug.current
                    ? "border-primary bg-primary text-on-dark"
                    : "border-border text-on-light/70 hover:border-accent hover:text-accent"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center font-sans text-on-light/60">
            {category
              ? "No products in this category yet."
              : "Our product catalog is coming soon."}
          </p>
        )}
      </div>
    </div>
  );
}
