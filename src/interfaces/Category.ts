export interface CategoryResponse {
  category: Category
}

export interface Category {
  name: string
  subcategories: Subcategory[]
  createdAt: string
  updatedAt: string
  id: string
}

export interface Subcategory {
  name: string
  createdAt: string
  updatedAt: string
  category: string
  id: string
}

export interface CategoryBody {
  name: string
  subcategories: [{ name: string }]
}
