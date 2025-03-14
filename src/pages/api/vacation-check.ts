import type { NextApiRequest } from "next";
import ms from "ms";

const query = `
  query {
    user (login: "ray-1337") {
      status {
        message expiresAt
        limitedAvailability: indicatesLimitedAvailability
      }
    }
  }
`;

export const runtime = 'edge';
 
export default async function handler(req: NextApiRequest) {
  if (req.method !== "GET") {
    return new Response(null, { status: 405 });
  };

  const apiKey = process.env.GITHUB_API_KEY;
  if (!apiKey || typeof apiKey !== "string") {
    return new Response(null, { status: 400 });
  };

  const request = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({query}),
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${apiKey}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (request.status !== 200) {
    return new Response(`Received status code [${request.status}] from GitHub.`, { status: 500, headers: { "Content-Type": "text/plain" } });
  };

  const json = await request.json() as { data: { user: { status: PartialUserStatus | null } } };

  const cacheTime = Math.round(ms("1d") / 1000);

  return new Response(JSON.stringify({ state: json.data.user.status || null }), {
    status: 200,
    headers: {
      "Cache-Control": `public, max-age=${cacheTime}, s-maxage=${cacheTime}, immutable`,
      "Content-Type": "application/json"
    }
  });
};