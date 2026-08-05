import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { productBySlugQuery, allProductsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { SanityImage } from "@/components/ui/SanityImage";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import type { Product } from "@/types";

export async function generateStaticParams() {
  const products = await client.fetch<Product[]>(allProductsQuery);
  return products.map((product) => ({ slug: product.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch<Product | null>(productBySlugQuery, { slug });

  if (!product) return {};

  const title = product.seoTitle || `${product.name} | Chefs Base LLP`;
  const description = product.seoDescription || product.shortDescription;
  const image = product.mainImage
    ? urlForImage(product.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await client.fetch<Product | null>(productBySlugQuery, { slug });

  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    ...(product.mainImage
      ? { image: urlForImage(product.mainImage).width(1200).height(900).url() }
      : {}),
    ...(product.category?.name ? { category: product.category.name } : {}),
  };

  return (
    <div className="px-6 py-20">
      <JsonLd data={productJsonLd} />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-surface-alt">
            {product.mainImage && (
              <SanityImage
                src={urlForImage(product.mainImage).width(900).height(675).url()}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((image, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-xl bg-surface-alt"
                >
                  <SanityImage
                    src={urlForImage(image).width(200).height(200).url()}
                    alt={`${product.name} gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {product.category?.name && (
            <Link
              href={`/products?category=${product.category.slug.current}`}
              className="w-fit font-sans text-xs uppercase tracking-wide text-accent"
            >
              {product.category.name}
            </Link>
          )}
          <h1 className="font-serif text-5xl italic text-on-light">{product.name}</h1>
          <p className="font-sans text-lg text-on-light/70">{product.shortDescription}</p>

          {product.description && (
            <div className="prose prose-sm max-w-none font-sans text-on-light/80">
              <PortableText value={product.description} />
            </div>
          )}

          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h2 className="font-serif text-xl italic text-on-light">Ingredients</h2>
              <p className="mt-1 font-sans text-sm text-on-light/70">
                {product.ingredients.join(", ")}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 border-t border-border pt-6 font-sans text-sm">
            {product.shelfLife && (
              <div>
                <span className="block text-xs uppercase tracking-wide text-muted">
                  Shelf Life
                </span>
                <span className="text-on-light">{product.shelfLife}</span>
              </div>
            )}
            {product.storageInfo && (
              <div>
                <span className="block text-xs uppercase tracking-wide text-muted">
                  Storage
                </span>
                <span className="text-on-light">{product.storageInfo}</span>
              </div>
            )}
          </div>

          {product.customOrderAvailable && (
            <p className="font-sans text-sm text-on-light/70">
              Custom formulations and packaging available for this product.
            </p>
          )}

          <Button variant="primary" href="/contact" className="w-fit">
            Request a Quote
          </Button>
        </div>
      </div>

      {(product.preparationSteps || (product.sopFiles && product.sopFiles.length > 0)) && (
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="rounded-xl bg-surface-alt p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-2xl italic text-on-light">How to Prepare</h2>
              {product.sopFiles && product.sopFiles.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {product.sopFiles.map((sop, i) => (
                    <a
                      key={i}
                      href={sop.fileUrl}
                      download={sop.filename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-accent px-4 py-2 font-sans text-sm text-accent transition-colors hover:bg-accent hover:text-on-light"
                    >
                      <DownloadIcon className="h-4 w-4" />
                      Download SOP{sop.label ? ` (${sop.label})` : ""}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {product.preparationSteps && (
              <div className="prose prose-sm mt-4 max-w-none font-sans text-on-light/80">
                <PortableText value={product.preparationSteps} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
