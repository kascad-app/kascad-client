import type { NextApiRequest, NextApiResponse } from "next";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fields = "username,biography,profile_picture_url,media.limit(8){media_url,permalink,id}";
    const url = `https://graph.instagram.com/${USER_ID}?fields=${fields}&access_token=${ACCESS_TOKEN}`;
    const instaRes = await fetch(url);
    const data = await instaRes.json();

    const profile = {
      username: data.username,
      biography: data.biography,
      profile_picture_url: data.profile_picture_url,
      posts: data.media.data,
    };

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: "Erreur API Instagram" });
  }
}
