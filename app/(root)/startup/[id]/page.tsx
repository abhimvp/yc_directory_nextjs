// main_url/startup/[id]/page.tsx -> dynamic route for each startup details page
// main_url/startup/123 -> for startup with id 123
// main_url/startup/abc -> for startup with id abc
import React from "react";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

export const experimental_ppr = true; // enabling partial page rendering for this dynamic route

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id; // extract the id from params

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  // fetch the startup details using the id

  if (!post) {
    return notFound(); // if no startup found, return 404 page
  }
  return (
    <div>
      <h1 className="text-3xl">Startup Details Page</h1>
      <p>
        {post.title} - {post.description}
      </p>
    </div>
  );
};

export default Page;
