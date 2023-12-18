import { fetchWithoutToken } from 'src/helpers/fetchWhithoutToken'
import { METHOD_VALUES, fetchWithToken } from 'src/helpers/fetchWithToken'
import { type Inventory, type InventoryId } from 'src/interfaces/Inventory'

interface InventoriesResponse {
  inventories: {
    items: InventoryId[]
    total: number
  }

}

interface InventoryResponse {
  inventory: InventoryId
  error?: string
}

export const getInventories = async (search: string): Promise<InventoriesResponse> => {
  const busqueda = search !== undefined ? `?search=${search.toUpperCase()}` : ''

  const inventories = await fetchWithoutToken({ endpoint: `proscai/inventories${busqueda}` })

  return inventories
}

export const getInventory = async ({ id }: { id: string }): Promise<InventoryResponse> => {
  const inventory = await fetchWithToken({ endpoint: `inventories/${id}`, method: 'GET' })
  return inventory
}

export const getByIseq = async ({ iseq }: { iseq: string }): Promise<InventoryResponse> => {
  const inventory = await fetchWithToken({ endpoint: `inventories/iseq/${iseq}`, method: 'GET' })
  return inventory
}

export const getInventoryProscai = async ({ id }: { id: string }): Promise<InventoryResponse> => {
  const inventory = await fetchWithoutToken({ endpoint: `proscai/inventories/${id}` })

  return inventory
}

export const liberarInventory = async ({ id }: { id: any }): Promise<InventoryResponse> => {
  const inventory = await fetchWithToken({ endpoint: `inventories/${id}`, body: { paused: false }, method: METHOD_VALUES.PATCH })
  return inventory
}

export const postInventory = async ({ inventory }: { inventory: Inventory }): Promise<InventoryResponse> => {
  const newInventory = {
    ...inventory
  }
  const inventoryDB = await fetchWithToken({ endpoint: 'inventories', method: 'POST', body: newInventory })

  return inventoryDB
}
