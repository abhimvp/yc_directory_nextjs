// main_url/startup/[id]/page.tsx -> dynamic route for each startup details page
// main_url/startup/123 -> for startup with id 123
// main_url/startup/abc -> for startup with id abc
import React, { Suspense } from "react";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit(); // initialize markdown-it
export const experimental_ppr = true; // enabling partial page rendering for this dynamic route

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id; // extract the id from params

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  // fetch the startup details using the id

  if (!post) {
    return notFound(); // if no startup found, return 404 page
  }

  // Get parsed markdown content
  const parsedContent = md.render(post?.pitch || "");
  return (
    <div>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={84}
                height={84}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium">@{post.author.username}</p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {/* Render parsed markdown content as HTML */}
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No Details provided</p>
          )}
        </div>

        <hr className="divider" />
        {/* TODO: EDITOR SELECTED STARTUPS */}
        {/* to update dynamic content - wrap it in a suspense */}
        <Suspense
          fallback={<Skeleton className="h-[20px] w-[100px] rounded-full" />}
        >
          {/* Add code here that will be rendered dynamically - View.tsx */}
          <View id={id} />
        </Suspense>
      </section>
    </div>
  );
};

export default Page;
