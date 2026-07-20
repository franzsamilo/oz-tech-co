export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(featured desc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  tags,
  coverImage,
  author->{
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    motto,
    photo
  }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  tags,
  coverImage,
  body,
  author->{
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    motto,
    photo
  }
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)] {
  "slug": slug.current
}`;

const authorProjection = `{
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  motto,
  links,
  photo
}`;

export const authorsQuery = `*[_type == "author" && defined(slug.current)] | order(name asc) ${authorProjection}`;

export const authorBySlugQuery = `*[_type == "author" && slug.current == $slug][0] ${authorProjection}`;

export const authorSlugsQuery = `*[_type == "author" && defined(slug.current)] {
  "slug": slug.current
}`;
