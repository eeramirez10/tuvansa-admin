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

export const getInventories = async ({ search = '', from = '', almacen = '01', size = '2' }: { search?: string, from?: string, almacen?: string, size?: string }): Promise<InventoriesResponse> => {
  // search = search ?? search.trim().toUpperCase()

  const params = new URLSearchParams({
    almacen,
    search: search !== null || !search ? search.trim().toUpperCase() : '',
    size
  })
  const inventories = from === 'proscai' ? await fetchWithToken({ endpoint: `proscai/inventories?${params.toString()}` }) : await fetchWithToken({ endpoint: `inventories?${params.toString()}` })

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

export const deleteInventoryCount = async ({ inventoryId, countId }: { inventoryId: string, countId: string }): Promise<InventoryResponse> => {
  const inventoryDB = await fetchWithToken({ endpoint: `inventories/${inventoryId}/count/${countId}`, method: 'DELETE' })

  return inventoryDB
}
