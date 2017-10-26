// @flow
import test from 'ava'
import td from 'testdouble'
import Database from '../../src/Database'
import CommentsService from '../../src/one/CommentsService'

const FakeDatabase = td.constructor(Database)

test('getting all comments', async t => {
  const database = new FakeDatabase()
  const commentsService = new CommentsService(database)

  const savedComment = { id: 'uuid1', message: 'Hello World!' }
  td.when(database.select('comments')).thenResolve([savedComment])

  t.deepEqual(await commentsService.getAll(), [savedComment])
})

test('getting a specific comment by id', async t => {
  const database = new FakeDatabase()
  const commentsService = new CommentsService(database)

  const savedComment = { id: 'uuid1', message: 'Hello World!' }
  td.when(database.select('comments')).thenResolve([savedComment])

  t.deepEqual(await commentsService.getOne('uuid1'), savedComment)
})

test('creating a comment', async t => {
  const database = new FakeDatabase()
  const commentsService = new CommentsService(database)

  const comment = { message: 'Hello World!' }
  const savedComment = { id: 'uuid1', message: 'Hello World!' }

  td.when(database.insert('comments', comment)).thenResolve(savedComment)
  t.is(await commentsService.create(comment), savedComment)
})
