import {toSentenceCase} from "@shared/utils-change-case"
import {setErrorMap} from "zod"

export function updateZodErrorFormat() {
  setErrorMap((issue, ctx) => {
    const propertyName =
      issue.path.length > 0
        ? toSentenceCase(issue.path.join(" "))
        : "This field"

    switch (issue.code) {
      case "invalid_type":
        if (issue.received === "undefined" || issue.received === "null") {
          return {message: `${propertyName} is required`}
        }
        return {
          message: `${propertyName} must be of type ${issue.expected}, received ${issue.received}`,
        }

      case "invalid_literal":
        return {
          message: `${propertyName} must be exactly ${JSON.stringify(
            issue.expected
          )}`,
        }

      case "unrecognized_keys":
        const keys =
          Array.isArray(issue.keys) && issue.keys.length > 0
            ? issue.keys.map((key) => `"${key}"`).join(", ")
            : "unrecognized keys"
        return {
          message: `${propertyName} contains ${keys}`,
        }

      case "invalid_union":
        return {
          message: `${propertyName} does not match any of the allowed types`,
        }

      case "invalid_union_discriminator":
        return {
          message: `${propertyName} must have a valid discriminator value`,
        }

      case "invalid_enum_value":
        const validValues =
          Array.isArray(issue.options) && issue.options.length > 0
            ? issue.options.map((opt) => `"${opt}"`).join(", ")
            : "valid values"
        return {
          message: `${propertyName} must be one of the following values: ${validValues}`,
        }

      case "invalid_arguments":
        return {
          message: `${propertyName} has invalid function arguments`,
        }

      case "invalid_return_type":
        return {
          message: `${propertyName} has an invalid function return type`,
        }

      case "invalid_date":
        return {
          message: `${propertyName} must be a valid date`,
        }

      case "invalid_string":
        if (issue.validation === "email") {
          return {message: `${propertyName} must be a valid email address`}
        }
        if (issue.validation === "url") {
          return {message: `${propertyName} must be a valid URL`}
        }
        if (issue.validation === "uuid") {
          return {message: `${propertyName} must be a valid UUID`}
        }
        if (issue.validation === "cuid") {
          return {message: `${propertyName} must be a valid CUID`}
        }
        if (issue.validation === "cuid2") {
          return {message: `${propertyName} must be a valid CUID2`}
        }
        if (issue.validation === "ulid") {
          return {message: `${propertyName} must be a valid ULID`}
        }
        if (issue.validation === "regex") {
          return {message: `${propertyName} must match the required pattern`}
        }
        if (issue.validation === "emoji") {
          return {message: `${propertyName} must contain only emoji characters`}
        }
        if (issue.validation === "ip") {
          return {message: `${propertyName} must be a valid IP address`}
        }
        if (issue.validation === "datetime") {
          return {
            message: `${propertyName} must be a valid ISO datetime string`,
          }
        }
        return {
          message: `${propertyName} has an invalid format`,
        }

      case "too_small":
        const minimum = issue.minimum
        const smallType =
          issue.type === "string"
            ? "character" + (minimum === 1 ? "" : "s")
            : issue.type === "array"
            ? "item" + (minimum === 1 ? "" : "s")
            : "value"

        if (issue.inclusive) {
          if (issue.type === "string" || issue.type === "array") {
            return {
              message:
                minimum === 0
                  ? `${propertyName} cannot be empty`
                  : `${propertyName} must contain at least ${minimum} ${smallType}`,
            }
          }
          return {
            message: `${propertyName} must be greater than or equal to ${minimum}`,
          }
        }

        return {
          message:
            issue.type === "string" || issue.type === "array"
              ? `${propertyName} must contain more than ${minimum} ${smallType}`
              : `${propertyName} must be greater than ${minimum}`,
        }

      case "too_big":
        const maximum = issue.maximum
        const bigType =
          issue.type === "string"
            ? "character" + (maximum === 1 ? "" : "s")
            : issue.type === "array"
            ? "item" + (maximum === 1 ? "" : "s")
            : "value"

        if (issue.inclusive) {
          return {
            message:
              issue.type === "string" || issue.type === "array"
                ? `${propertyName} must contain at most ${maximum} ${bigType}`
                : `${propertyName} must be less than or equal to ${maximum}`,
          }
        }

        return {
          message:
            issue.type === "string" || issue.type === "array"
              ? `${propertyName} must contain fewer than ${maximum} ${bigType}`
              : `${propertyName} must be less than ${maximum}`,
        }

      case "invalid_intersection_types":
        return {
          message: `${propertyName} has incompatible types`,
        }

      case "not_multiple_of":
        return {
          message: `${propertyName} must be a multiple of ${issue.multipleOf}`,
        }

      case "not_finite":
        return {
          message: `${propertyName} must be a finite number`,
        }

      case "custom":
        return {
          message: issue.message
            ? `${propertyName}: ${issue.message}`
            : `${propertyName} is invalid`,
        }

      default:
        return {
          message: ctx.defaultError
            ? `${propertyName}: ${ctx.defaultError}`
            : `${propertyName} is invalid`,
        }
    }
  })
}
