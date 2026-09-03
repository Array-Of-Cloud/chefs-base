import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName, tagline, logoIcon, logoIconLight, logoFull, logoFullLight, contactEmail, contactPhone,
    whatsappNumber, address, secondaryAddressLabel, secondaryAddress, gstNumber, fssaiNumber,
    colorScheme,
    instagram, facebook, linkedin,
    defaultSeoTitle, defaultSeoDescription, defaultOgImage
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroEyebrow, heroHeadline, heroSubhead, heroPrimaryButtonLabel, heroSecondaryButtonLabel,
    trustStats,
    whyUsReasons,
    whoWeServeIntro, whoWeServeSegments,
    ctaHeadline, ctaSubtext, ctaButtonLabel
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    storyParagraph1, storyParagraph2, missionText, visionText
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(name asc) [0...4] {
    _id, name, slug, shortDescription, mainImage,
    category->{ name, slug }
  }
`;

export const allProductsQuery = groq`
  *[_type == "product"] | order(name asc) {
    _id, name, slug, shortDescription, mainImage,
    category->{ name, slug }, customOrderAvailable
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id, name, slug, shortDescription, description,
    preparationSteps,
    mainImage, gallery, ingredients, shelfLife,
    storageInfo, customOrderAvailable,
    "sopFiles": sopFiles[]{
      label,
      "fileUrl": file.asset->url,
      "filename": file.asset->originalFilename
    },
    category->{ name, slug },
    seoTitle, seoDescription
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, mainImage, publishedAt, readTime,
    author->{ name, role, photo }
  }
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt, readTime,
    author->{ name, role, photo }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, body, mainImage, publishedAt, readTime,
    author->{ name, role, photo },
    seoTitle, seoDescription
  }
`;

export const certificationsQuery = groq`
  *[_type == "certification"] | order(order asc) {
    _id, name, logo, issuedBy, licenseNumber
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id, name, slug, description
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember" && defined(photo)] | order(order asc) {
    _id, name, role, photo, bio
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id, quote, name, role, company, country, photo
  }
`;
