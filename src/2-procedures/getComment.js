// @flow
import type Database from '../Database'

type Comment = {
  author: string,
  message: string,
  spam: boolean
}

type Persisted = {
  id: string
}

type Schema = {
  comments: Comment
}

export default async function(
  database: Database<Schema>,
  id: string
): Promise<Comment & Persisted> {
  const comments = await database.select('comments')
  const comment = comments.find(comment => comment.id === id)
  if (!comment) {
    throw new Error(`Could not find Comment with id ${id}`)
  }
  return comment
}
