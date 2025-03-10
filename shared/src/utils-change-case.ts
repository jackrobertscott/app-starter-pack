export const toKebabCase = (data: string) => {
  return data
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
}

export const toSnakeCase = (data: string) => {
  return data
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase()
}

export const toSpacedCase = (data: string) => {
  return data
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .replace(/ +/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
}

export const toCamelCase = (data: string) => {
  return data.replace(/[^a-zA-Z0-9]+(.)?/g, (_, c) =>
    c ? c.toUpperCase() : ""
  )
}

export const toPascalCase = (data: string) => {
  return toCamelCase(data).replace(/^[a-z]/, (c) => c.toUpperCase())
}

export const toCapitalCase = (data: string) => {
  return data
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .replace(/ +/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export const toSentenceCase = (data: string) => {
  return data
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .replace(/ +/g, " ")
    .trim()
    .toLowerCase()
    .replace(/^[a-z]/, (c) => c.toUpperCase())
}
