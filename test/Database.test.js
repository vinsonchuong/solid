/* @flow */
import test from 'ava'
import { withTempFile } from './helpers'
import Database from '../src/Database'

withTempFile()

type Record = {
  title: string
}

type Schema = {
  records: Record
}

test('inserting a record', async t => {
  const { tempFile } = t.context
  const database: Database<Schema> = new Database(tempFile)

  const row = await database.insert('records', { title: 'foo' })
  t.deepEqual(await database.select('records'), [{ id: row.id, title: 'foo' }])
})

test('updating a record', async t => {
  const { tempFile } = t.context
  const database: Database<Schema> = new Database(tempFile)

  const row = await database.insert('records', { title: 'foo' })
  await database.update('records', { ...row, title: 'bar' })
  t.deepEqual(await database.select('records'), [{ id: row.id, title: 'bar' }])
})

test('deleting a record', async t => {
  const { tempFile } = t.context
  const database: Database<Schema> = new Database(tempFile)

  const row = await database.insert('records', { title: 'foo' })
  await database.delete('records', row)
  t.deepEqual(await database.select('records'), [])
})
