import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header:    [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Home":     "/",
      "Resume":   "https://github.com/necopinus/resume/raw/main/resume.pdf",
      "Contact":  "/#contact",
      "RSS Feed": "/grimoire/index.xml"
    }
  })
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  header: [
    Component.Breadcrumbs({
      spacerSymbol: "/",
      rootName:     "Cardboard Iguana Security",
      hideOnRoot:   false
    })
  ],
  beforeBody: [
    Component.ContentMeta(),
    Component.TagList()
  ],
  afterBody: [
    Component.Backlinks()
  ],
  left: [],
  right: [
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        {
          Component: Component.Darkmode()
        }
      ]
    }),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents())
  ]
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  header: [
    Component.Breadcrumbs({
      spacerSymbol: "/",
      rootName:     "Cardboard Iguana Security",
      hideOnRoot:   false
    })
  ],
  beforeBody: [],
  afterBody: [],
  left: [],
  right: []
}
