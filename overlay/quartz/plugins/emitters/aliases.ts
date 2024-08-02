import { FilePath, FullSlug, joinSegments, resolveRelative, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import { write } from "./helpers"
import DepGraph from "../../depgraph"

// Modified on 2024-07-30
// Based on commit e1a9661be7d2b4834b1e70535170a36a6ff39560
// Added support for frontmatter keys other than alias/aliases to be
// used for determining alias paths. Keys for non-string, non-array
// values will be ignored, and non-string array values will also be
// ignored. The motivation here is to be able to use aliases within
// Obsidian but only instantiate those I care about in Quartz.

interface Options {
  frontmatterKeys: string | string[]
}

const defaultOptions: Options = {
  frontmatterKeys: "aliases"
}

function coalesceAliases(data: { [key: string]: any }, aliasKeyNames: string | string[]) {
  var aliasKeys:string[] = Array.isArray(aliasKeyNames) ? aliasKeyNames : [aliasKeyNames]

  var aliases:string[] = []
  for (let aliasKey of aliasKeys) {
    if (typeof aliasKey === "string") {
      aliasKey = aliasKey === "alias" ? "aliases" : aliasKey

      if (data[aliasKey] !== undefined && data[aliasKey] !== null) {
        if (typeof data[aliasKey] === "string") {
          aliases.push(data[aliasKey])
        } else if (Array.isArray(data[aliasKey])) {
          for (let element of data[aliasKey]) {
            if (typeof element === "string") {
              aliases.push(element)
            }
          }
        }
      }
    }
  }

  return [...new Set(aliases)]
}

export const AliasRedirects: QuartzEmitterPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "AliasRedirects",
    getQuartzComponents() {
      return []
    },
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()

      const { argv } = ctx
      for (const [_tree, file] of content) {
        const dir = path.posix.relative(argv.directory, path.dirname(file.data.filePath!))
        const aliases = file.data.frontmatter ? coalesceAliases(file.data.frontmatter, opts.frontmatterKeys) : []
        //const aliases = file.data.frontmatter?.aliases ?? []
        const slugs = aliases.map((alias) => path.posix.join(dir, alias) as FullSlug)
        const permalink = file.data.frontmatter?.permalink
        if (typeof permalink === "string") {
          slugs.push(permalink as FullSlug)
        }

        for (let slug of slugs) {
          // fix any slugs that have trailing slash
          if (slug.endsWith("/")) {
            slug = joinSegments(slug, "index") as FullSlug
          }

          graph.addEdge(file.data.filePath!, joinSegments(argv.output, slug + ".html") as FilePath)
        }
      }

      return graph
    },
    async emit(ctx, content, _resources): Promise<FilePath[]> {
      const { argv } = ctx
      const fps: FilePath[] = []

      for (const [_tree, file] of content) {
        const ogSlug = simplifySlug(file.data.slug!)
        const dir = path.posix.relative(argv.directory, path.dirname(file.data.filePath!))
        const aliases = file.data.frontmatter ? coalesceAliases(file.data.frontmatter, opts.frontmatterKeys) : []
        //const aliases = file.data.frontmatter?.aliases ?? []
        const slugs: FullSlug[] = aliases.map((alias) => path.posix.join(dir, alias) as FullSlug)
        const permalink = file.data.frontmatter?.permalink
        if (typeof permalink === "string") {
          slugs.push(permalink as FullSlug)
        }

        for (let slug of slugs) {
          // fix any slugs that have trailing slash
          if (slug.endsWith("/")) {
            slug = joinSegments(slug, "index") as FullSlug
          }

          const redirUrl = resolveRelative(slug, file.data.slug!)
          const fp = await write({
            ctx,
            content: `
              <!DOCTYPE html>
              <html lang="en-us">
              <head>
              <title>${ogSlug}</title>
              <link rel="canonical" href="${redirUrl}">
              <meta name="robots" content="noindex">
              <meta charset="utf-8">
              <meta http-equiv="refresh" content="0; url=${redirUrl}">
              </head>
              </html>
              `,
            slug,
            ext: ".html",
          })

          fps.push(fp)
        }
      }
      return fps
    }
  }
}
