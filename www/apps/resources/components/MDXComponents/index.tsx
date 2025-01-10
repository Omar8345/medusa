import type { MDXComponents as MDXComponentsType } from "mdx/types"
import {
  Link,
  MDXComponents as UiMdxComponents,
  TypeList,
  WorkflowDiagram,
} from "docs-ui"
import { CommerceModuleSections } from "../CommerceModuleSections"

const MDXComponents: MDXComponentsType = {
  ...UiMdxComponents,
  a: Link,
  TypeList,
  WorkflowDiagram,
  CommerceModuleSections,
}

export default MDXComponents
