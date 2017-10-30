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
  comment: Comment & Persisted
): Promise<void> {
  await database.update('comments', comment)
}
