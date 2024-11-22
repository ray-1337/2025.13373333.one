import type { NextApiRequest, NextApiResponse } from "next";
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
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  };

  const apiKey = process.env.GITHUB_API_KEY;
  if (!apiKey || typeof apiKey !== "string") {
    return res.status(400).end();
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
    return res.status(500).end();
  };

  const json = await request.json() as { data: { user: { status: PartialUserStatus | null } } };

  return res
    .status(200)
    .setHeader("Cache-Control", `public, max-age=${Math.round(ms("1d") / 1000)}, immutable`)
    .json({ state: json.data.user.status || null });
};