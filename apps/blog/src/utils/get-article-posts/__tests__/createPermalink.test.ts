import { createPermalink } from '../createPermalink'

describe('createPermalink', () => {
  it('should remove .mdx extension and prepend dataType', () => {
    const filename = 'test-file.mdx'
    const dataType = 'articles'
    const expected = '/articles/test-file'

    expect(createPermalink(filename, dataType)).toEqual(expected)
  })

  it('should add locale when it is not "en"', () => {
    const filename = 'test-file.mdx'
    const dataType = 'notes'
    const locale = 'fr'
    const expected = '/fr/notes/test-file'

    expect(createPermalink(filename, dataType, locale)).toEqual(expected)
  })

  it('should not add locale when it is "en"', () => {
    const filename = 'test-file.mdx'
    const dataType = 'articles'
    const locale = 'en'
    const expected = '/articles/test-file'

    expect(createPermalink(filename, dataType, locale)).toEqual(expected)
  })
})
