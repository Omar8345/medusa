import Handlebars from "handlebars"
import { DeclarationReflection, SignatureReflection } from "typedoc"
import { getReflectionTypeFakeValueStr, getStepInputType } from "utils"
import pkg from "js-beautify"

const { js_beautify } = pkg

export default function () {
  Handlebars.registerHelper(
    "stepExamples",
    function (this: SignatureReflection): string {
      const stepReflection = this.parent

      const exampleTags = stepReflection.comment?.blockTags.filter(
        (tag) => tag.tag === "@example"
      )

      if (exampleTags?.length) {
        return Handlebars.helpers.example(stepReflection)
      }

      return generateStepExample(stepReflection)
    }
  )
}

function generateStepExample(stepReflection: DeclarationReflection): string {
  if (!stepReflection.signatures?.length) {
    return ""
  }
  const inputType = getStepInputType(stepReflection.signatures[0])
  const inputStr = inputType
    ? `${getReflectionTypeFakeValueStr({
        reflectionType: inputType,
        name: "",
      })}`
    : ""

  // generate example
  return `
\`\`\`ts title="src/workflows/my-workflow.ts"
${js_beautify(
  `import { createWorkflow } from "@medusajs/framework/workflows-sdk"
import { ${stepReflection.name} } from "@medusajs/medusa/core-flows"

const myWorkflow = createWorkflow(
  "my-workflow",
  () => {
    const data = ${stepReflection.name}(${inputStr})
  }
)`,
  {
    indent_size: 2,
    brace_style: "preserve-inline",
    wrap_line_length: 80,
  }
)}
\`\`\`
  `
}
