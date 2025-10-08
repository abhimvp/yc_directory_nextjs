// this code can only be run on server side
import "server-only";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token, // we need to add the token here
});

if (!writeClient.config().token) {
  throw new Error(
    "Missing write token for Sanity client. Please check your environment variables."
  );
}
