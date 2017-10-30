// @flow
import type Database from '../Database'

type Comment = {
  author: string,
  message: string,
  spam: boolean
}

type Schema = {
  comments: Comment
}

export default async function(
  database: Database<Schema>,
  author: string
): Promise<void> {
  const comments = await database.select('comments')
  for (const comment of comments) {
    if (comment.author === author) {
      await database.update('comments', { ...comment, spam: true })
    }
  }
}
