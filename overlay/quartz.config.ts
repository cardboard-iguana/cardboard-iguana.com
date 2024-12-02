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
      "codex"
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
          light: "#fffbef",                         // --bg1
          lightgray: "#e8e5d5",                     // --ui1
          gray: "#829181",                          // --tx2
          darkgray: "#5c6a72",                      // --tx1
          dark: "#5c6a72",                          // --tx1
          secondary: "hsl(83, 36%, 53%)",           // --accent
          tertiary: "hsl(80, 37%, 45%)",            // --accent(h - 3, s * 1.02, l * 0.85)
          highlight: "rgba(224, 220, 199, 0.3)",    // --bg3(r, g, b, a * 0.6)
          textHighlight: "rgba(252, 221, 152, 0.3)" // --hl2
        },
        darkMode: {
          light: "#fffbef",                          // --bg1
          lightgray: "#e8e5d5",                      // --ui1
          gray: "#829181",                           // --tx2
          darkgray: "#5c6a72",                       // --tx1
          dark: "#5c6a72",                           // --tx1
          secondary: "hsl(83, 36%, 53%)",            // --accent
          tertiary: "hsl(80, 37%, 45%)",             // --accent(h - 3, s * 1.02, l * 0.85)
          highlight: "rgba(224, 220, 199, 0.3)",     // --bg3(r, g, b, a * 0.6)
          textHighlight: "rgba(252, 221, 152, 0.3)"  // --hl2
          //light: "#272e33",                        // --bg1
          //lightgray: "#495156",                    // --ui1
          //gray: "#9da9a0",                         // --tx2
          //darkgray: "#d3c6aa",                     // --tx1
          //dark: "#d3c6aa",                         // --tx1
          //secondary: "hsl(81, 34%, 63%)",          // --accent
          //tertiary: "hsl(78, 35%, 54%)",           // --accent(h - 3, s * 1.02, l * 0.85)
          //highlight: "rgba(79, 88, 94, 0.3)",      // --bg3(r, g, b, a * 0.6)
          //textHighlight: "rgba(139, 119, 81, 0.3)" // --hl2
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
          dark: "vitesse-light" // vitesse-dark
        }
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
      Plugin.Description({
        descriptionLength: 256
      }),
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
      Plugin.ContentIndex({
        rssLimit: 1024,
        rssFullHtml: true,
        includeEmptyFiles: false
      }),
      Plugin.AliasRedirects({
        frontmatterKeys: "quartzAliases"
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage()
    ]
  }
}

export default config
