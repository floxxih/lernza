import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const indexPath = resolve(new URL(".", import.meta.url).pathname, "..", "index.html")
const html = readFileSync(indexPath, "utf8")

function countMeta(property, attr = "property") {
  const needle = `<meta ${attr}="${property}"`
  return html.split(needle).length - 1
}

const checks = [
  { attr: "property", key: "og:image", max: 1 },
  { attr: "name", key: "twitter:image", max: 1 },
  { attr: "name", key: "twitter:image:src", max: 0 },
]

const failures = []
for (const { attr, key, max } of checks) {
  const found = countMeta(key, attr)
  if (found > max) failures.push(`${key} appears ${found} times (max ${max})`)
  if (found < max && max === 0) continue
}

if (failures.length > 0) {
  console.error("[validate-index-meta] index.html meta validation failed:")
  for (const msg of failures) console.error(`- ${msg}`)
  process.exit(1)
}

