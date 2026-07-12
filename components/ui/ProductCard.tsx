import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-alt">
        {product.mainImage && (
          <SanityImage
            src={urlForImage(product.mainImage).width(600).height(450).url()}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {product.category?.name && (
          <span className="font-sans text-xs uppercase tracking-wide text-accent">
            {product.category.name}
          </span>
        )}
        <h3 className="font-serif text-2xl italic text-on-light">{product.name}</h3>
        <p className="font-sans text-sm text-on-light/70">{product.shortDescription}</p>
      </div>
    </Link>
  );
}
