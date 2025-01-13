/**
 * Additional data, passed through the `additional_data` property accepted in HTTP
 * requests, that allows passing custom data and handle them in hooks.
 * 
 * Learn more in [this documentation](https://docs.medusajs.com/learn/fundamentals/api-routes/additional-data).
 */
export type AdditionalData = {
  additional_data?: Record<string, unknown>
}
