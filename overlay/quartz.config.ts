import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle:            "Cardboard Iguana Security",
    pageTitleSuffix:      " :: Cardboard Iguana Security",
    enableSPA:            false,
    enablePopovers:       false,
    analytics:            null,
    locale:               "en-US",
    baseUrl:              "cardboard-iguana.com/grimoire",
    ignorePatterns:       [],
    defaultDateType:      "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans",
        body:   "Noto Sans",
        code:   "Noto Sans Mono"
      },
      colors: {
        lightMode: {
          light:         "#f9f5d7", // --bg1
          lightgray:     "#f2e5bc", // --ui1
          gray:          "#ebdbb2", // --ui3
          darkgray:      "#4f3829", // --tx1
          dark:          "#654735", // --tx2
          secondary:     "hsl(70, 45%, 33%)", // --ax1
          tertiary:      "hsl(70, 45%, 25%)", // --ax2 (l - 8%)
          highlight:     "hsla(70, 45%, 33%, 20%)", // --hl1, but 20% opacity instead of 30%
          textHighlight: "rgba(180, 113, 9, 0.2)"  // --hl2
        },
        darkMode: {
          light:         "#1d2021", // --bg1
          lightgray:     "#3c3836", // --ui1
          gray:          "#504945", // --ui3
          darkgray:      "#ddc7a1", // --tx1
          dark:          "#d4be98", // --tx2
          secondary:     "hsl(70, 36%, 47%)", // --ax1
          tertiary:      "hsl(70, 36%, 55%)", // --ax2 (l + 8%)
          highlight:     "hsla(70, 36%, 47%, 30%)", // --hl1
          textHighlight: "rgba(216, 166, 87, 0.2)"  // --hl2
        }
      }
    }
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: [
          "frontmatter",
          "filesystem"
        ]
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark:  "github-dark"
        },
        keepBackground: false
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: true
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.HardLineBreaks(),
      Plugin.TableOfContents({
        maxDepth: 6
      }),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
        prettyLinks:            false,
        openLinksInNewTab:      true,
        lazyLoad:               true
      }),
      Plugin.Description(),
      Plugin.Latex({
        renderEngine: "mathjax"
      })
    ],
    filters: [
      Plugin.RemoveDrafts()
    ],
    emitters: [
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        sort: (a, b) => {
          let isJournalTag = /^Journal(\/.+)?$/

          let aComparisonString = a.frontmatter?.title ?? ""
          let bComparisonString = b.frontmatter?.title ?? ""

          if ((a.frontmatter?.tags?.some(tag => isJournalTag.test(tag))) && (b.frontmatter?.tags?.some(tag => isJournalTag.test(tag)))) {
            aComparisonString = a.frontmatter.date ?? aComparisonString
            bComparisonString = b.frontmatter.date ?? bComparisonString
          }

          aComparisonString = aComparisonString.toLowerCase().replace(/(^| )(a|an|the)( |$)/g, " ").replace(/\([^\)]*\)/g, " ").replace(/ +/g, " ").trim()
          bComparisonString = bComparisonString.toLowerCase().replace(/(^| )(a|an|the)( |$)/g, " ").replace(/\([^\)]*\)/g, " ").replace(/ +/g, " ").trim()  

          return aComparisonString.localeCompare(bComparisonString, undefined, {
            numeric: true,
            sensitivity: "base",
            ignorePunctuation: true
          })
        }
      }),
      Plugin.TagPage({
        sort: (a, b) => {
          let isJournalTag = /^Journal(\/.+)?$/

          let aComparisonString = a.frontmatter?.title ?? ""
          let bComparisonString = b.frontmatter?.title ?? ""

          if ((a.frontmatter?.tags?.some(tag => isJournalTag.test(tag))) && (b.frontmatter?.tags?.some(tag => isJournalTag.test(tag)))) {
            aComparisonString = a.frontmatter.date ?? aComparisonString
            bComparisonString = b.frontmatter.date ?? bComparisonString
          }

          aComparisonString = aComparisonString.toLowerCase().replace(/(^| )(a|an|the)( |$)/g, " ").replace(/\([^\)]*\)/g, " ").replace(/ +/g, " ").trim()
          bComparisonString = bComparisonString.toLowerCase().replace(/(^| )(a|an|the)( |$)/g, " ").replace(/\([^\)]*\)/g, " ").replace(/ +/g, " ").trim()

          return aComparisonString.localeCompare(bComparisonString, undefined, {
            numeric: true,
            sensitivity: "base",
            ignorePunctuation: true
          })
        }
      }),
      Plugin.ContentIndex({
        rssLimit:          1024,
        rssFullHtml:       true,
        includeEmptyFiles: false
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Plugin.CustomOgImages() // Broken as of 2025-08-02
    ]
  }
}

export default config
