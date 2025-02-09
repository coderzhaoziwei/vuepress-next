import { createApp, createPage } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/no-layouts.js'),
})

describe('core > page > createPage', () => {
  it('should throw an error', async () => {
    const consoleError = console.error
    console.error = jest.fn()

    await expect(createPage(app, {})).rejects.toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })

  it('should create an empty page', async () => {
    const page = await createPage(app, {
      path: '/',
    })

    // page data
    expect(page.key).toBeTruthy()
    expect(page.path).toBe('/')
    expect(page.lang).toBe('en-US')
    expect(page.title).toBe('')
    expect(page.frontmatter).toEqual({})
    expect(page.excerpt).toBe('')
    expect(page.headers).toEqual([])

    // extra data
    expect(page.pathInferred).toBeNull()
    expect(page.pathLocale).toBe('/')
    expect(page.content).toBe('')
    expect(page.slug).toBe('')
    expect(page.date).toBe('0000-00-00')
    expect(page.deps).toEqual([])
    expect(page.links).toEqual([])

    // file info
    expect(page.filePath).toBeNull()
    expect(page.filePathRelative).toBeNull()
    expect(page.htmlFilePath).toBe(app.dir.dest(`index.html`))
    expect(page.htmlFilePathRelative).toBe(`index.html`)
    expect(page.componentFilePath).toBe(
      app.dir.temp(`pages/${page.htmlFilePathRelative}.vue`)
    )
    expect(page.componentFilePathRelative).toBe(
      `pages/${page.htmlFilePathRelative}.vue`
    )
    expect(page.componentFileContent).toBe(`<template></template>`)
    expect(page.componentFileChunkName).toBe(page.key)
    expect(page.dataFilePath).toBe(
      app.dir.temp(`pages/${page.htmlFilePathRelative}.js`)
    )
    expect(page.dataFilePathRelative).toBe(
      `pages/${page.htmlFilePathRelative}.js`
    )
    expect(page.dataFileChunkName).toBe(page.key)
  })
})
