import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  `*[_type=="startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search] | order(_createdAt desc){
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, image
  },
  description,
  category,
  image,
  views
}`
);

// we only get the data we need 

export const STARTUP_BY_ID_QUERY = defineQuery(
  `*[_type=="startup" && _id == $id][0]{
  _id,
    title,
    slug,
    _createdAt,
    author -> {
        _id, name, image , username, bio
      },
      description,
      category,
      image,
      views,
    pitch
}`
);
