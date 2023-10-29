import { describe, it } from 'node:test'
import { ping } from '../solutions/index.js'
import { equal, ifError } from 'node:assert'

describe('1. ping', () => {
  it('1.1. ping midu.dev', (_, done) => {
    ping('midu.dev', (err, info) => {
      ifError(err)
      equal(info.ip, 'midu.dev')
      done()
    })
  })
})
