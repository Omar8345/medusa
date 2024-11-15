import { kebabCase, model } from "@medusajs/framework/utils"
import Product from "./product"

const categoryHandleIndexName = "IDX_category_handle_unique"
// const categoryHandleIndexStatement = createPsqlIndexStatementHelper({
//   name: categoryHandleIndexName,
//   tableName: "product_category",
//   columns: ["handle"],
//   unique: true,
//   where: "deleted_at IS NULL",
// })

const categoryMpathIndexName = "IDX_product_category_path"
// const categoryMpathIndexStatement = createPsqlIndexStatementHelper({
//   name: categoryMpathIndexName,
//   tableName: "product_category",
//   columns: ["mpath"],
//   unique: false,
//   where: "deleted_at IS NULL",
// })

const ProductCategory = model
  .define("ProductCategory", {
    id: model.id({ prefix: "pcat" }).primaryKey(),
    name: model.text().searchable(),
    description: model.text().searchable().default(""),
    handle: model.text().searchable(),
    mpath: model.text(),
    is_active: model.boolean().default(false),
    is_internal: model.boolean().default(false),
    rank: model.number().default(0),
    metadata: model.json().nullable(),
    parent_category: model
      .belongsTo(() => ProductCategory, {
        mappedBy: "category_children",
      })
      .nullable(),
    category_children: model.hasMany(() => ProductCategory, {
      mappedBy: "parent_category",
    }),
    products: model.manyToMany(() => Product, {
      mappedBy: "categories",
    }),
  })
  .hooks({
    creating: (productCategory) => {
      productCategory.mpath = `${
        productCategory.mpath ? productCategory.mpath + "." : ""
      }${productCategory.id}`

      /**
       * TODO: A validation step might need to exists, maybe at the service level or the repository level
       */
      productCategory.handle ??= kebabCase(
        productCategory.name ?? productCategory.id // TODO: There seems to be a bug with model configuration where both properties are optional but non nullable.
      )
    },
  })
  .cascades({
    delete: ["category_children"],
  })
  .indexes([
    {
      name: categoryMpathIndexName,
      on: ["mpath"],
      unique: false,
      where: "deleted_at IS NULL",
    },
    {
      name: categoryHandleIndexName,
      on: ["handle"],
      unique: true,
      where: "deleted_at IS NULL",
    },
  ])

// categoryMpathIndexStatement.MikroORMIndex()
// categoryHandleIndexStatement.MikroORMIndex()
// @Entity({ tableName: "product_category" })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// class ProductCategory {
// @PrimaryKey({ columnType: "text" })
// id!: string
// @Searchable()
// @Property({ columnType: "text", nullable: false })
// name?: string
// @Searchable()
// @Property({ columnType: "text", default: "", nullable: false })
// description?: string
// @Searchable()
// @Property({ columnType: "text", nullable: false })
// handle?: string
// @Property({ columnType: "text", nullable: false })
// mpath?: string
// @Property({ columnType: "boolean", default: false })
// is_active?: boolean
// @Property({ columnType: "boolean", default: false })
// is_internal?: boolean
// @Property({
//   columnType: "integer",
//   nullable: false,
//   default: 0,
// })
// rank: number
// @ManyToOne(() => ProductCategory, {
//   columnType: "text",
//   fieldName: "parent_category_id",
//   nullable: true,
//   mapToPk: true,
//   onDelete: "cascade",
// })
// parent_category_id?: string | null
// @ManyToOne(() => ProductCategory, { nullable: true, persist: false })
// parent_category?: ProductCategory
// @OneToMany({
//   entity: () => ProductCategory,
//   mappedBy: (productCategory) => productCategory.parent_category,
// })
// category_children = new Collection<ProductCategory>(this)
// @Property({
//   onCreate: () => new Date(),
//   columnType: "timestamptz",
//   defaultRaw: "now()",
// })
// created_at?: Date
// @Property({
//   onCreate: () => new Date(),
//   onUpdate: () => new Date(),
//   columnType: "timestamptz",
//   defaultRaw: "now()",
// })
// updated_at?: Date
// @Index({ name: "IDX_product_category_deleted_at" })
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at?: Date
// @Property({ columnType: "jsonb", nullable: true })
// metadata: Record<string, unknown> | null = null
// @ManyToMany(() => Product, (product) => product.categories)
// products = new Collection<Product>(this)
// @OnInit()
// async onInit() {
//   this.id = generateEntityId(this.id, "pcat")
//   this.parent_category_id ??= this.parent_category?.id ?? null
// }
// @BeforeCreate()
// async onCreate(args: EventArgs<ProductCategory>) {
//   this.id = generateEntityId(this.id, "pcat")
//   this.parent_category_id ??= this.parent_category?.id ?? null
//   if (!this.handle && this.name) {
//     this.handle = kebabCase(this.name)
//   }
//   this.mpath = `${this.mpath ? this.mpath + "." : ""}${this.id}`
// }
// }

export default ProductCategory
