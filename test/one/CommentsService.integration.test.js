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

  const comment = await commentsService.create({
    author: 'Vinson',
    message: 'Hello World!',
    spam: false
  })
  t.deepEqual(await commentsService.getAll(), [comment])
  t.deepEqual(await commentsService.getOne(comment.id), comment)
})

test('updating a comment', async t => {
  const { tempFile } = t.context
  const database = new Database(tempFile)
  const commentsService = new CommentsService(database)

  const comment = await commentsService.create({
    author: 'Vinson',
    message: 'Hello World!',
    spam: false
  })
  await commentsService.update({ ...comment, message: 'Zombies' })

  t.deepEqual(await commentsService.getOne(comment.id), {
    id: comment.id,
    author: 'Vinson',
    message: 'Zombies',
    spam: false
  })
})

test("marking a user's posts as spam", async t => {
  const { tempFile } = t.context
  const database = new Database(tempFile)
  const commentsService = new CommentsService(database)

  const bananas = await commentsService.create({
    author: 'Tamara',
    message: 'Bananas',
    spam: false
  })

  const powerBun = await commentsService.create({
    author: 'Vinson',
    message: 'Power Bun',
    spam: false
  })

  const doomChicken = await commentsService.create({
    author: 'Vinson',
    message: 'Doom Chicken',
    spam: false
  })

  await commentsService.markAsSpam('Vinson')

  const updatedBananas = await commentsService.getOne(bananas.id)
  t.false(updatedBananas.spam)

  const updatedPowerBun = await commentsService.getOne(powerBun.id)
  t.true(updatedPowerBun.spam)

  const updatedDoomChicken = await commentsService.getOne(doomChicken.id)
  t.true(updatedDoomChicken.spam)
})
