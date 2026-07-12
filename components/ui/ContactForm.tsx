"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

interface ProductOption {
  _id: string;
  name: string;
}

export function ContactForm({ products }: { products: ProductOption[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      productInterest:
        products.length > 0
          ? formData.getAll("productInterest")
          : formData.get("productInterest"),
      quantity: formData.get("quantity"),
      message: formData.get("message"),
      website: formData.get("website"), // honeypot
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent bg-surface-alt p-8 text-center">
        <h2 className="font-serif text-2xl italic text-on-light">Thank you</h2>
        <p className="mt-2 font-sans text-sm text-on-light/70">
          We&apos;ve received your request and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot — hidden from real users via CSS, not type="hidden", so
          unsophisticated bots that skip only hidden-typed inputs still fill it. */}
      <div
        className="pointer-events-none absolute -left-full opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Company / Restaurant Name" name="company" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Country" name="country" required />
        <Field
          label="Estimated monthly quantity"
          name="quantity"
          placeholder="e.g. 500 kg / month"
        />
      </div>

      {products.length > 0 ? (
        <fieldset className="flex flex-col gap-2">
          <legend className="font-sans text-sm text-on-light">Product interest</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {products.map((product) => (
              <label
                key={product._id}
                className="flex items-center gap-2 font-sans text-sm text-on-light/80"
              >
                <input
                  type="checkbox"
                  name="productInterest"
                  value={product.name}
                  className="accent-accent"
                />
                {product.name}
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <Field
          label="Product interest"
          name="productInterest"
          placeholder="What are you looking to source?"
        />
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-sans text-sm text-on-light">
          Additional details (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="rounded-xl border border-border bg-surface px-4 py-3 font-sans text-sm text-on-light outline-none focus:border-accent"
        />
      </div>

      {status === "error" && (
        <p className="font-sans text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center justify-center rounded-xl bg-primary px-6 py-3 font-sans text-sm font-medium text-on-dark transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-sans text-sm text-on-light">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-border bg-surface px-4 py-3 font-sans text-sm text-on-light outline-none focus:border-accent placeholder:text-on-light/40"
      />
    </div>
  );
}
