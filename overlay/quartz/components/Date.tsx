import { GlobalConfiguration } from "../cfg"
import { ValidLocale } from "../i18n"
import { QuartzPluginData } from "../plugins/vfile"

// Modified on 2024-07-31
// Based on commit e1a9661be7d2b4834b1e70535170a36a6ff39560
// Made one customization and one fix.
//
// 1. I changed the format parameters passed into toLocaleDateString to
//    output something a bit longer (and, I think, more pleasing to
//    look at).
// 2. I fixed an annoying off-by-one date issue I was having. It turns
//    out that when a date is read in without a timespec, the time-part
//    is set (not unreasonably) to midnight UTC. This mostly works
//    fine, except that there *isn't* actually a timezone attached to
//    this object, which causes toLocaleDateString() to default to
//    writing out the representation relative to the *system* timezone.
//    Since I'm behind UTC, this meant that my dates were always
//    displayed one day behind! The quick-and-dirty solution is to
//    force toLocaleDateString to use UTC, but really this should
//    probably be extracted from the Date object being worked on, with
//    UTC used as a fall-back.
//
// TODO - Make (1) into a properly exposed option, similar to how the
// file exporer does.

interface Props {
  date: Date
  locale?: ValidLocale
}

export type ValidDateType = keyof Required<QuartzPluginData>["dates"]

export function getDate(cfg: GlobalConfiguration, data: QuartzPluginData): Date | undefined {
  if (!cfg.defaultDateType) {
    throw new Error(
      `Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.`,
    )
  }
  return data.dates?.[cfg.defaultDateType]
}

export function formatDate(d: Date, locale: ValidLocale = "en-US"): string {
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  })
}

export function Date({ date, locale }: Props) {
  return <>{formatDate(date, locale)}</>
}
