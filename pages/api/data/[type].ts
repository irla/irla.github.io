// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import experience  from './experience.json'
import projects from './projects.json'
import skills from './skills.json'


const data = new Map<string, any>([
  ['experience', experience],
  ['projects', projects],
  ['skills', skills],
])
/**
 * This handler was only used for a moment to checkout how nextjs routing is working
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query
  res.status(200).json(data.get(type as string))
}
