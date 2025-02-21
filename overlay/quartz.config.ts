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
    generateSocialImages: true,
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
          light:         "hsla(  0,   0%, 100%, 100%)", // --bg1
          lightgray:     "hsla(  0,   0%,  90%, 100%)", // --ui1
          gray:          "hsla(  0,   0%,  84%, 100%)", // --ui2
          darkgray:      "hsla(  0,   0%,   6%, 100%)", // --tx1
          dark:          "hsla(  0,   0%,   4%, 100%)", // --tx1 :: calc(var(--base-l) - 92%)
          secondary:     "hsla(154,  39%,  49%, 100%)", // --ax1
          tertiary:      "hsla(154,  39%,  41%, 100%)", // --ax2
          /*
          highlight:     "hsla(154,  50%,  29%,  30%)", // --hl1
          textHighlight: "hsla(154, 100%,  50%,  50%)"  // --hl2 :: use --accent-h, not 60
          */
          highlight:     "hsla(154,  50%,  29%,  10%)",
          textHighlight: "hsla(154,  50%,  50%,  30%)"
        },
        darkMode: {
          light:         "hsla(  0,   0%,  15%, 100%)", // --bg1
          lightgray:     "hsla(  0,   0%,  21%, 100%)", // --ui1
          gray:          "hsla(  0,   0%,  27%, 100%)", // --ui2
          darkgray:      "hsla(  0,   0%,  82%, 100%)", // --tx1
          dark:          "hsla(  0,   0%,  86%, 100%)", // --tx1 :: calc(var(--base-l) + 71%)
          secondary:     "hsla(154,  31%,  54%, 100%)", // --ax1
          tertiary:      "hsla(154,  31%,  62%, 100%)", // --ax2
          /*
          highlight:     "hsla(154,  50%,  40%,  30%)", // --hl1
          textHighlight: "hsla(154, 100%,  66%,  30%)"  // --hl2 :: use --accent-h, not 33
          */
          highlight:     "hsla(154,  50%,  40%,  10%)",
          textHighlight: "hsla(154,  50%,  66%,  10%)"
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
          light: "vitesse-light",
          dark:  "vitesse-dark"
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
      Plugin.NotFoundPage()
    ]
  }
}

export default config
