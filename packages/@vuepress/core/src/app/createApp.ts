import { createMarkdown } from '@vuepress/markdown'
import { createPluginApi } from '../pluginApi'
import type { App, AppConfig } from '../types'
import { appInit } from './appInit'
import { appPrepare } from './appPrepare'
import { appUse } from './appUse'
import { appUseByConfig } from './appUseByConfig'
import { createAppDir } from './createAppDir'
import { createAppEnv } from './createAppEnv'
import { createAppOptions } from './createAppOptions'
import { createAppSiteData } from './createAppSiteData'
import { createAppVersion } from './createAppVersion'
import { createAppWriteTemp } from './createAppWriteTemp'
import { resolveBundler } from './resolveBundler'
import { resolveTheme } from './resolveTheme'

/**
 * Create vuepress app
 */
export const createApp = (config: AppConfig): App => {
  const version = createAppVersion()
  const options = createAppOptions(config)
  const dir = createAppDir(options)
  const env = createAppEnv(options)
  const siteData = createAppSiteData(options)
  const markdown = createMarkdown(options.markdown)
  const pluginApi = createPluginApi()
  const writeTemp = createAppWriteTemp(dir)

  const app = {
    version,
    options,
    dir,
    env,
    siteData,
    markdown,
    pluginApi,

    writeTemp,
    use: (...args) => appUse(app, ...args),
    useByConfig: (...args) => appUseByConfig(app, ...args),
    init: () => appInit(app),
    prepare: () => appPrepare(app),
    dev: () => resolveBundler(options).dev(app),
    build: () => resolveBundler(options).build(app),
  } as App

  // resolve theme plugins and layouts
  const theme = resolveTheme(app, options.theme)
  theme.plugins.forEach((plugin) => app.use(plugin))
  app.layouts = theme.layouts

  return app
}
