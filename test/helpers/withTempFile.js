// @flow
import test from 'ava'
import { promisify } from 'util'
import { writeFile } from 'fs'
import tempy from 'tempy'

export default function(): void {
  test.beforeEach(async t => {
    const tempFile = tempy.file()
    await promisify(writeFile)(tempFile, '{}')
    Object.assign(t.context, { tempFile })
  })
}
