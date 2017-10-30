// @flow
import test from 'ava'
import { withTempFile } from '../helpers'
import Database from '../../src/Database'
import { getComment, createComment, markAsSpam } from '../../src/2-procedures'

withTempFile()

test("marking a user's posts as spam", async t => {
  const { tempFile } = t.context
  const database = new Database(tempFile)

  const bananas = await createComment(database, {
    author: 'Tamara',
    message: 'Bananas',
    spam: false
  })

  const powerBun = await createComment(database, {
    author: 'Vinson',
    message: 'Power Bun',
    spam: false
  })

  const doomChicken = await createComment(database, {
    author: 'Vinson',
    message: 'Doom Chicken',
    spam: false
  })

  await markAsSpam(database, 'Vinson')

  const updatedBananas = await getComment(database, bananas.id)
  t.false(updatedBananas.spam)

  const updatedPowerBun = await getComment(database, powerBun.id)
  t.true(updatedPowerBun.spam)

  const updatedDoomChicken = await getComment(database, doomChicken.id)
  t.true(updatedDoomChicken.spam)
})
