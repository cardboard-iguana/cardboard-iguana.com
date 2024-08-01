import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

// Modified on 2024-07-31
// Based on commit e1a9661be7d2b4834b1e70535170a36a6ff39560
// Complete hack job to make sure that backlinks are sorted in the same
// way as my file explorer.
//
// TODO - Make this into a properly exposed option, like the file
// explorer's sort feature.

const Backlinks: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const slug = simplifySlug(fileData.slug!)
  const backlinkFiles = allFiles
    .filter((file) => file.links?.includes(slug))
    .sort((a, b) => {
      if ((typeof a.frontmatter?.title === "string") && (typeof b.frontmatter?.title === "string")) {
        return a.frontmatter.title.localeCompare(b.frontmatter.title, undefined, {
          numeric: true,
          sensitivity: "base",
          ignorePunctuation: true
        })
      } else {
        return a.slug.localeCompare(b.slug, undefined, {
          numeric: true,
          sensitivity: "base",
          ignorePunctuation: true
        })
      }
    })

  return (
    <div class={classNames(displayClass, "backlinks")}>
      <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
      <ul class="overflow">
        {backlinkFiles.length > 0 ? (
          backlinkFiles.map((f) => (
            <li>
              <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                {f.frontmatter?.title}
              </a>
            </li>
          ))
        ) : (
          <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>
        )}
      </ul>
    </div>
  )
}

Backlinks.css = style
export default (() => Backlinks) satisfies QuartzComponentConstructor
