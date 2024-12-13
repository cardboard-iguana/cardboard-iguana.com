import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Cardboard Iguana Security",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "cardboard-iguana.com/grimoire",
    ignorePatterns: [
      ".DS_Store",
      ".obsidian",
      ".nomedia",
      ".trash",
      "assets/private",
      "metadata",
      "templates"
    ],
    defaultDateType: "created",
    generateSocialImages: true,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans",
        body: "Noto Sans",
        code: "Noto Sans Mono"
      },
      colors: {
        lightMode: {
          light: "hsla(0, 0%, 100%, 100%)",         // --bg1
          lightgray: "hsla(0, 0%, 90%, 100%)",      // --ui1
          gray: "hsla(0, 0%, 46%, 100%)",           // --tx2
          darkgray: "hsla(0, 0%, 6%, 100%)",        // --tx1
          dark: "hsla(0, 0%, 6%, 100%)",            // --tx1
          secondary: "hsla(80, 40%, 61%, 100%)",    // --ax1
          tertiary: "hsla(80, 50%, 76%, 30%)",      // --hl1
          highlight: "hsla(0, 0%, 46%, 12%)",       // --bg3
          textHighlight: "hsla(53, 100%, 50%, 50%)" // --hl2
        },
        darkMode: {
          light: "hsla(0, 0%, 15%, 100%)",          // --bg1
          lightgray: "hsla(0, 0%, 21%, 100%)",      // --ui1
          gray: "hsla(0, 0%, 60%, 100%)",           // --tx2
          darkgray: "hsla(0, 0%, 82%, 100%)",       // --tx1
          dark: "hsla(0, 0%, 82%, 100%)",           // --tx1
          secondary: "hsla(80, 40%, 73%, 100%)",    // --ax1 :: calc(var(--accent-l) * 60 / 50)
          tertiary: "hsla(80, 50%, 40%, 30%)",      // --hl1
          highlight: "hsla(0, 0%, 55%, 12%)",       // --bg3
          textHighlight: "hsla(33, 100%, 66%, 30%)" // --hl2
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
          light: "material-theme-lighter",
          dark: "material-theme-darker"
        },
        keepBackground: true
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
        prettyLinks: false,
        openLinksInNewTab: true,
        lazyLoad: true
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
      Plugin.TagPage(/*{
        sort: (a, b) => {
          if ((!a.file && !b.file) || (a.file && b.file)) {
            if ((typeof a.file?.frontmatter?.quartzSortString === "string") && (typeof b.file?.frontmatter?.quartzSortString === "string")) {
                return a.file.frontmatter.quartzSortString.localeCompare(b.file.frontmatter.quartzSortString, undefined, {
                  numeric: true,
                  sensitivity: "base",
                  ignorePunctuation: true
                })
            } else {
              return a.displayName.localeCompare(b.displayName, undefined, {
                numeric: true,
                sensitivity: "base",
                ignorePunctuation: true
              })
            }
          }
          if (a.file && !b.file) {
            return 1
          } else {
            return -1
          }
        }
      }*/),
      Plugin.ContentIndex({
        rssLimit: 1024,
        rssFullHtml: true,
        includeEmptyFiles: false
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage()
    ]
  }
}

export default config
