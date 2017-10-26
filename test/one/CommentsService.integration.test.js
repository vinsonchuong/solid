// @flow
import test from 'ava'
import { withTempFile } from '../helpers'
import Database from '../../src/Database'
import CommentsService from '../../src/one/CommentsService'

withTempFile()

test('creating a comment', async t => {
  const { tempFile } = t.context
  const database = new Database(tempFile)
  const commentsService = new CommentsService(database)

  const comment = await commentsService.create({ message: 'Hello World!' })
  t.deepEqual(await commentsService.getAll(), [comment])
  t.deepEqual(await commentsService.getOne(comment.id), comment)
})
