export interface Category {
  id: string
  name: string
  subcategories: Subcategory[]

}

export interface CategoryBody {
  name: string
  subcategories: [{ name: string }]
}

export interface Subcategory {
  id: string
  name: string
}
