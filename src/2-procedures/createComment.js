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

export default function(
  database: Database<Schema>,
  comment: Comment
): Promise<Comment & Persisted> {
  return database.insert('comments', comment)
}
