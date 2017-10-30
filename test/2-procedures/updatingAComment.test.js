// @flow
import test from 'ava'
import { withTempFile } from '../helpers'
import Database from '../../src/Database'
import {
  getComment,
  createComment,
  updateComment
} from '../../src/2-procedures'

withTempFile()

test('updating a comment', async t => {
  const { tempFile } = t.context
  const database = new Database(tempFile)

  const comment = await createComment(database, {
    author: 'Vinson',
    message: 'Hello World!',
    spam: false
  })
  await updateComment(database, { ...comment, message: 'Zombies' })

  t.deepEqual(await getComment(database, comment.id), {
    id: comment.id,
    author: 'Vinson',
    message: 'Zombies',
    spam: false
  })
})
