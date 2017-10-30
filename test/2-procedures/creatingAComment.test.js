// @flow
import test from 'ava'
import { withTempFile } from '../helpers'
import Database from '../../src/Database'
import {
  getAllComments,
  getComment,
  createComment
} from '../../src/2-procedures'

withTempFile()

test('creating a comment', async t => {
  const { tempFile } = t.context
  const database = new Database(tempFile)

  const comment = await createComment(database, {
    author: 'Vinson',
    message: 'Hello World!',
    spam: false
  })
  t.deepEqual(await getAllComments(database), [comment])
  t.deepEqual(await getComment(database, comment.id), comment)
})
