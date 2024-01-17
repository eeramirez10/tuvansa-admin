import { fetchWithoutToken } from 'src/helpers/fetchWhithoutToken'
import { METHOD_VALUES, fetchWithToken } from 'src/helpers/fetchWithToken'
import { type InventoryId } from 'src/interfaces/Inventory'

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

interface InventoriesProps {
  search?: string
  from?: string
  almacen?: string
  size?: string
  abortController?: AbortController
}

export const getInventories = async (props: InventoriesProps): Promise<InventoriesResponse> => {
  const {
    search = '',
    from = '',
    almacen = '01',
    size = '10',
    abortController
  } = props

  const params = new URLSearchParams({
    almacen,
    search: search !== null || !search ? search.trim().toUpperCase() : '',
    size
  })
  const inventories = from === 'proscai' ? await fetchWithToken({ endpoint: `proscai/inventories?${params.toString()}`, abortController }) : await fetchWithToken({ endpoint: `inventories?${params.toString()}` })

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

export const postInventory = async ({ count, iseq }: { count: number, iseq: string }): Promise<InventoryResponse> => {
  const inventoryDB = await fetchWithToken({ endpoint: 'inventories', method: METHOD_VALUES.POST, body: { count, iseq } })
  return inventoryDB
}

export const deleteInventoryCount = async ({ inventoryId, countId }: { inventoryId: string, countId: string }): Promise<InventoryResponse> => {
  const inventoryDB = await fetchWithToken({ endpoint: `inventories/${inventoryId}/count/${countId}`, method: METHOD_VALUES.DELETE })

  return inventoryDB
}
