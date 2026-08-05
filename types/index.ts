import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "sanity";
import type { ThemeKey } from "@/lib/themes";

export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  shortDescription: string;
  mainImage: SanityImageSource;
  gallery?: SanityImageSource[];
  category: { name: string; slug: { current: string } };
  description?: PortableTextBlock[];
  preparationSteps?: PortableTextBlock[];
  sopFiles?: { label?: string; fileUrl: string; filename?: string }[];
  ingredients?: string[];
  shelfLife?: string;
  storageInfo?: string;
  customOrderAvailable: boolean;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  mainImage: SanityImageSource;
  readTime?: number;
  author?: { name: string; role: string; photo?: SanityImageSource };
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  country?: string;
  photo?: SanityImageSource;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: SanityImageSource;
  bio?: string;
}

export interface Certification {
  _id: string;
  name: string;
  logo: SanityImageSource;
  issuedBy?: string;
  licenseNumber?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  logo?: SanityImageSource;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address?: string;
  gstNumber?: string;
  fssaiNumber?: string;
  colorScheme?: ThemeKey;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultOgImage?: SanityImageSource;
}
