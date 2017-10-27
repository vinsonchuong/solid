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

export default class {
  database: Database<Schema>

  constructor(database: Database<Schema>) {
    this.database = database
  }

  getAll(): Promise<Array<Comment & { id: string }>> {
    return this.database.select('comments')
  }

  async getOne(id: string): Promise<Comment> {
    const comments = await this.getAll()
    const comment = comments.find(comment => comment.id === id)
    if (!comment) {
      throw new Error(`Could not find Comment with id ${id}`)
    }
    return comment
  }

  create(comment: Comment): Promise<Comment & { id: string }> {
    return this.database.insert('comments', comment)
  }

  update(comment: Comment & { id: string }): Promise<void> {
    return this.database.update('comments', comment)
  }

  async markAsSpam(author: string): Promise<void> {
    const comments = await this.getAll()
    const updatedComments = comments
      .filter(comment => comment.author === author)
      .map(commentByAuthor => ({ ...commentByAuthor, spam: true }))
    for (const updatedComment of updatedComments) {
      await this.update(updatedComment)
    }
  }
}
