// @flow
import test from 'ava'
import td from 'testdouble'
import Database from '../../src/Database'
import CommentsService from '../../src/1-service-classes/CommentsService'

const FakeDatabase = td.constructor(Database)

test('getting all comments', async t => {
  const database = new FakeDatabase()
  const commentsService = new CommentsService(database)

  const savedComment = {
    id: 'uuid1',
    author: 'Vinson',
    message: 'Hello World!',
    spam: false
  }
  td.when(database.select('comments')).thenResolve([savedComment])

  t.deepEqual(await commentsService.getAll(), [savedComment])
})

test('getting a specific comment by id', async t => {
  const database = new FakeDatabase()
  const commentsService = new CommentsService(database)

  const savedComment = {
    id: 'uuid1',
    author: 'Vinson',
    message: 'Hello World!',
    spam: false
  }
  td.when(database.select('comments')).thenResolve([savedComment])

  t.deepEqual(await commentsService.getOne('uuid1'), savedComment)
})

test('creating a comment', async t => {
  const database = new FakeDatabase()
  const commentsService = new CommentsService(database)

  const comment = {
    author: 'Vinson',
    message: 'Hello World!',
    spam: false
  }
  const savedComment = {
    id: 'uuid1',
    author: 'Vinson',
    message: 'Hello World!',
    spam: false
  }

  td.when(database.insert('comments', comment)).thenResolve(savedComment)
  t.is(await commentsService.create(comment), savedComment)
})

test('updating a comment', async t => {
  const database = new FakeDatabase()
  const commentsService = new CommentsService(database)

  const comment = {
    id: 'uuid',
    author: 'Vinson',
    message: 'Hello World!',
    spam: false
  }
  const updatedComment = {
    ...comment,
    message: 'Zombies'
  }

  await commentsService.update(updatedComment)
  td.verify(database.update('comments', updatedComment))
  t.pass()
})
