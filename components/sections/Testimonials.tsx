import { client } from "@/sanity/lib/client";
import { featuredTestimonialsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Testimonial } from "@/types";

export async function Testimonials() {
  const testimonials = await client.fetch<Testimonial[]>(featuredTestimonialsQuery);

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="font-serif text-4xl italic text-on-light">What Buyers Say</h2>
          <p className="max-w-xl font-sans text-on-light/70">
            Feedback from the restaurant kitchens and foodservice partners we work with.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial._id}
              className="flex flex-col gap-6 rounded-xl border border-border bg-surface-alt p-6 sm:p-8"
            >
              <blockquote className="font-serif text-xl italic leading-relaxed text-on-light">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                {testimonial.photo && (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <SanityImage
                      src={urlForImage(testimonial.photo).width(96).height(96).url()}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="font-sans text-sm">
                  <div className="font-medium text-on-light">{testimonial.name}</div>
                  <div className="text-on-light/60">
                    {[testimonial.role, testimonial.company, testimonial.country]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
