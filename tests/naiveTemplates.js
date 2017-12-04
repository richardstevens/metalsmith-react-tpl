import chai from 'chai'
import chaiLint from 'chai-lint'
chai.use(chaiLint)
const { expect } = chai
import naiveTemplates from '../lib/naiveTemplates'

describe('naiveTemplates', function () {
  it('returns bar from {{foo}}', function () {
    var result = naiveTemplates('{{foo}}', { foo: 'bar' })
    expect(result.foo).to.equal('bar')
    expect(result.contents.toString()).to.equal('bar')
  })
  it('returns nothing changed', function () {
    var result = naiveTemplates('{{foo}}', { bar: 'foo' })
    expect(result.bar).to.equal('foo')
    expect(result.contents.toString()).to.equal('{{foo}}')
  })
})

