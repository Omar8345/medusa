/**
 * @schema AdminFulfillmentProviderOptionsListResponse
 * type: object
 * description: The paginated list of fulfillment options.
 * x-schemaName: AdminFulfillmentProviderOptionsListResponse
 * required:
 *   - limit
 *   - offset
 *   - count
 *   - fulfillment_options
 * properties:
 *   limit:
 *     type: number
 *     title: limit
 *     description: The maximum number of items returned.
 *   offset:
 *     type: number
 *     title: offset
 *     description: The number of items skipped before retrieving the returned items.
 *   count:
 *     type: number
 *     title: count
 *     description: The total number of items.
 *   fulfillment_options:
 *     type: array
 *     description: The list of fulfillment options.
 *     items:
 *       $ref: "#/components/schemas/AdminFulfillmentProviderOption"
 * 
*/

