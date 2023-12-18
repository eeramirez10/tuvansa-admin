import { type User } from './Auth'

export interface InventoryProscai {
  iseq: string
  cod: string
  ean: string
  description: string
  quantity: number
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
}
