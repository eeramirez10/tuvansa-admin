import { type User } from './Auth'

const BRANCH_OFFICE_VALUES = {
  MEXICO: '01',
  MONTERREY: '02',
  VERACRUZ: '03',
  MEXICALI: '04',
  QUERETARO: '05',
  CANCUN: '06'
} as const

export type BranchOfficeValues = typeof BRANCH_OFFICE_VALUES[ keyof typeof BRANCH_OFFICE_VALUES]

export interface InventoryProscai {
  iseq: string
  cod: string
  ean: string
  description: string
  quantity: number
  branchOffice: BranchOffice
  ubications: Ubication
}

export interface Ubication extends InventoryProscai {

}

export interface InventoryProscaiId extends InventoryProscai {
  id: string
}

export interface Inventory {
  id: string
  iseq: string
  cod: string
  ean: string
  description: string
  quantity: string
  paused?: boolean
  counts?: CountId[]
  createdAt?: Date
  updatedAt?: Date
  user?: User
  branchOffice: BranchOffice
}

export interface BranchOffice {
  name: BranchOfficeValues
  code: string
}

export interface InventoryId extends Inventory {
  id: string
}

export interface Count {
  count: number
  createdAt: string
  updatedAt: string
  user: User
}

export interface CountId extends Count {
  id: string
  inventory: CountInventory

}

export interface CountInventory {
  iseq: string
  cod: string
  ean: string
  quantity: number
  description: string

}
