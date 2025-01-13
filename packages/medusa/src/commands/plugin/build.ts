import { logger } from "@medusajs/framework/logger"
import { Compiler } from "@medusajs/framework/build-tools"

export default async function build({
  directory,
  adminOnly,
}: {
  directory: string
  adminOnly: boolean
}): Promise<boolean> {
  logger.info("Starting build...")
  const compiler = new Compiler(directory, logger)

  const tsConfig = await compiler.loadTSConfigFile()
  if (!tsConfig) {
    logger.error("Unable to compile plugin")
    return false
  }

  await compiler.buildPluginBackend(tsConfig)
  return true
}
