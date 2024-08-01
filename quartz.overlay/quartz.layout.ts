import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Home": "/",
      "Resume": "https://github.com/necopinus/resume/raw/main/resume.pdf",
      "Contact": "/#contact",
      "RSS Feed": "/grimoire/index.xml"
    }
  })
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList()
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      sortFn: (a, b) => {
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
    }))
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks()
  ]
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer())
  ],
  right: []
}
