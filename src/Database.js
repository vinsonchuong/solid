/* @flow */
import { readFile, writeFile } from 'fs'
import { promisify } from 'util'
import uuid from 'uuid/v4'

// $FlowFixMe
export default class Database<Schema, Table: string & $Keys<Schema>> {
  filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
  }

  async select<T: Table>(table: T): Promise<Array<$ElementType<Schema, T>>> {
    const data = await read(this.filePath)
    return data[table]
  }

  async insert<T: Table, R: $ElementType<Schema, T>>(
    table: T,
    row: R
  ): Promise<R & { id: string }> {
    const rowWithId = { ...row, id: uuid() }

    await write(this.filePath, data => ({
      ...data,
      [table]: [...(data[table] || []), rowWithId]
    }))

    return rowWithId
  }

  async update<T: Table>(
    table: T,
    row: $ElementType<Schema, T> & { id: string }
  ): Promise<void> {
    await write(this.filePath, data => ({
      ...data,
      [table]: data[table].map(r => (r.id === row.id ? row : r))
    }))
  }

  async delete<T: Table>(
    table: T,
    row: $ElementType<Schema, T> & { id: string }
  ): Promise<void> {
    await write(this.filePath, data => ({
      ...data,
      [table]: data[table].filter(r => r.id !== row.id)
    }))
  }
}

async function read(jsonFilePath: string): Promise<{ [string]: Array<{}> }> {
  const contents = await promisify(readFile)(jsonFilePath, 'utf8')
  return JSON.parse(contents)
}

async function write<T: { [string]: Array<{}> }>(
  jsonFilePath: string,
  update: T => T
) {
  const contents = await promisify(readFile)(jsonFilePath, 'utf8')
  const data = JSON.parse(contents)

  const updatedData = update(data)

  const updatedContents = JSON.stringify(updatedData, null, 2)
  await promisify(writeFile)(jsonFilePath, updatedContents)
}
