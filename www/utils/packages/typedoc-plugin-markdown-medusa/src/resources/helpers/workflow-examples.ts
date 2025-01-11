import Handlebars from "handlebars"
import pkg from "js-beautify"
import { DeclarationReflection, SignatureReflection } from "typedoc"
import { getReflectionTypeFakeValueStr, getWorkflowInputType } from "utils"

const { js_beautify } = pkg

export default function () {
  Handlebars.registerHelper(
    "workflowExamples",
    function (this: SignatureReflection): string {
      const workflowReflection = this.parent
      const exampleStr: string[] = []

      const exampleTags = workflowReflection.comment?.blockTags.filter(
        (tag) => tag.tag === "@example"
      )

      if (!exampleTags?.length) {
        exampleStr.push(
          getExecutionCodeTabs({
            exampleCode: generateWorkflowExample(workflowReflection),
            workflowName: workflowReflection.name,
          })
        )
      } else {
        exampleTags.forEach((exampleTag) => {
          exampleTag.content.forEach((part) => {
            if (part.kind !== "code") {
              exampleStr.push(part.text)
              return
            }

            exampleStr.push(
              getExecutionCodeTabs({
                exampleCode: part.text,
                workflowName: workflowReflection.name,
              })
            )
          })
        })
      }

      return exampleStr.join("\n")
    }
  )
}

function getExecutionCodeTabs({
  exampleCode,
  workflowName,
}: {
  exampleCode: string
  workflowName: string
}): string {
  exampleCode = exampleCode.replace("```ts\n", "").replace("\n```", "")
  const beautifyOptions: pkg.JSBeautifyOptions = {
    indent_size: 2,
    brace_style: "preserve-inline",
    wrap_line_length: 80,
  }

  return `<CodeTabs group="workflow-exection">
    <CodeTab label="Another Workflow" value="another-workflow">
    
\`\`\`ts title="src/workflows/my-workflow.ts"
${js_beautify(
  `import { createWorkflow } from "@medusajs/framework/workflows-sdk"
import { ${workflowName} } from "@medusajs/medusa/core-flows"

const myWorkflow = createWorkflow(
  "my-workflow",
  () => {
    ${exampleCode
      .replace(`{ result }`, "result")
      .replace(`await `, "")
      .replace(`(container)\n\t.run(`, ".runAsStep(")}
  }
)`,
  beautifyOptions
)}
\`\`\`

    </CodeTab>
    <CodeTab label="API Route" value="api-route">
    
\`\`\`ts title="src/api/workflow/route.ts"
${js_beautify(
  `import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { ${workflowName} } from "@medusajs/medusa/core-flows"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  ${exampleCode.replace("container", "req.scope")}

  res.send(result)
}
`,
  beautifyOptions
)}
\`\`\`

    </CodeTab>
    <CodeTab label="Subscriber" value="subscriber">
    
\`\`\`ts title="src/subscribers/order-placed.ts"
${js_beautify(
  `import {
  type SubscriberConfig,
  type SubscriberArgs,
} from "@medusajs/framework"
import { ${workflowName} } from "@medusajs/medusa/core-flows"

export default async function handleOrderPlaced({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  ${exampleCode}

  console.log(result)
}

export const config: SubscriberConfig = {
  event: "order.placed",
}`,
  beautifyOptions
)}
\`\`\`

    </CodeTab>
    <CodeTab label="Scheduled Job" value="scheduled-job">
    
\`\`\`ts title="src/jobs/message-daily.ts"
${js_beautify(
  `import { MedusaContainer } from "@medusajs/framework/types"
import { ${workflowName} } from "@medusajs/medusa/core-flows"

export default async function myCustomJob(
  container: MedusaContainer
) {
  ${exampleCode}

  console.log(result)
}

export const config = {
  name: "run-once-a-day",
  schedule: "0 0 * * *",
}`,
  beautifyOptions
)}
\`\`\`

    </CodeTab>
  </CodeTabs>`
}

function generateWorkflowExample(
  workflowReflection: DeclarationReflection
): string {
  if (!workflowReflection.signatures?.length) {
    return ""
  }
  const inputType = getWorkflowInputType(workflowReflection.signatures[0])
  const inputStr = inputType
    ? `{\n\t\tinput: ${getReflectionTypeFakeValueStr({
        reflectionType: inputType,
        name: "",
      })}\n\t}`
    : ""

  // generate example
  return `const { result } = await ${workflowReflection.name}(container)\n\t.run(${inputStr})`
}
