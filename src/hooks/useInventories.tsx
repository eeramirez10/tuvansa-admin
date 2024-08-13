import { useAppDispatch, useAppSelector } from './useStore'
import { loadInventories, onFinishInventories, onStartInventories, selectInventory } from 'src/store/inventories/slice'
import { type Inventory, type InventoryId } from 'src/interfaces/Inventory'
import { deleteInventoryCount, getByIseq, getInventories, getInventoryProscai, liberarInventory, postInventory, release } from 'src/services/inventories'
import { useState } from 'react'
import { Form, type FormInstance } from 'antd'
import { toast } from 'sonner'
import { getShelter } from 'src/services/shelter'

interface InventoryReturn {
  inventory: Inventory | null
  inventories: Inventory[]
  isLoading: boolean
  form: FormInstance<any>
  options: { from: string, almacen: string }
  getInventory: ({ id }: { id: string }) => Promise<void>
  onLoadInventories: ({ from, almacen, abortController, size }: { from?: string, almacen?: string, abortController?: AbortController, size?: string }) => Promise<void>
  handleOnSubmit: (value: { count: number }) => Promise<void>
  handleliberarInventario: () => Promise<void>
  // handleOnSearch: (value: { search: string }, from?: string, almacen?: string) => Promise<void>
  handleOnSearch: ({ value, from, almacen }: { value: { search: string }, from: string, almacen: string }) => Promise<void>
  deleteCountbyId: ({ id }: { id: string }) => Promise<void>
  handleOptions: ({ from, almacen }: { from: string, almacen: string }) => void
  getShelterByAlmseq: ({ id }: { id: string }) => Promise<void>
  getInventoryProscaiByIseq: ({ id }: { id: string }) => Promise<InventoryId>
  releaseInventories: ({ paused }: { paused?: boolean }) => Promise<void>
  getAll: ({ search, from }: { search?: string, from?: string, almacen?: string }) => Promise<void>
}

export const useInventories = (): InventoryReturn => {
  const inventories = useAppSelector(state => state.inventories.data)
  const inventory = useAppSelector(state => state.inventories.selected)
  const isLoading = useAppSelector(state => state.inventories.isLoading)
  const dispatch = useAppDispatch()
  const [options, setOptions] = useState({
    from: 'proscai',
    almacen: '01'
  })
  const [form] = Form.useForm()

  const getInventory = async ({ id }: { id: string }): Promise<void> => {
    dispatch(onStartInventories())
    const inventory = await getByIseq({ iseq: id })
    dispatch(selectInventory(inventory.inventory))
  }

  const getInventoryProscaiByIseq = async ({ id }: { id: string }): Promise<InventoryId> => {
    const inventory = await getInventoryProscai({ id })

    return inventory.inventory
  }

  const getShelterByAlmseq = async ({ id }: { id: string }): Promise<void> => {
    const resp = getShelter({ id })

    console.log(resp)
  }

  const deleteCountbyId = async ({ id }: { id: string }): Promise<void> => {
    try {
      if (inventory === null) return

      dispatch(onStartInventories())

      await deleteInventoryCount({ inventoryId: inventory?.id, countId: id })

      const newCount = inventory?.counts?.filter(count => count.id !== id)

      const newInventory: Inventory = { ...inventory, counts: newCount }

      dispatch(selectInventory(newInventory))

      toast.success('Eliminado con exito')
    } catch (error) {
      toast.error('hubo un error al eliminar')
    }
  }

  const onLoadInventories = async ({ from = '', almacen = '01', abortController, size = '1' }: { from?: string, almacen?: string, abortController?: AbortController, size?: string }): Promise<void> => {
    dispatch(onStartInventories())

    getInventories({ from, almacen, abortController, size })
      .then((resp) => {
        const { inventories } = resp
        const { items } = inventories
        dispatch(loadInventories(items.map(item => ({ ...item, id: item.id ?? item.iseq }))))
      })
  }

  const handleOnSearch = async ({ value, from, almacen }: { value: { search: string }, from: string, almacen: string }): Promise<void> => {
    try {
      dispatch(onStartInventories())
      const resp = await getInventories({ search: value.search, from, almacen, size: '50' })

      dispatch(loadInventories(resp.inventories.items))
    } catch (error) {
      console.log(error)
      toast.error('hubo un error')
    }
  }

  const getAll = async ({ search, from }: { search?: string, from?: string, almacen?: string }): Promise<void> => {
    try {
      dispatch(onStartInventories())
      const resp = await getInventories({ search, from })

      dispatch(loadInventories(resp.inventories.items))
    } catch (error) {
      console.log(error)
      toast.error('hubo un error')
    }
  }

  const handleOnSubmit = async (value: { count: number }): Promise<void> => {
    dispatch(onStartInventories())
    const { count } = value

    try {
      if (inventory?.iseq === undefined) return

      const resp = await postInventory({ count, iseq: inventory?.iseq })

      if (resp.error !== undefined) {
        toast.error(resp.error)
        return
      }
      toast.success('Creado Correctamente')
      dispatch(selectInventory(resp.inventory))
    } catch (error) {
      console.log(error)
    } finally {
      form.resetFields()
    }
  }

  const handleliberarInventario = async (): Promise<void> => {
    dispatch(onStartInventories())
    const resp = await liberarInventory({ id: inventory?.id })

    dispatch(selectInventory(resp.inventory))
  }

  const handleOptions = ({ from, almacen }: { from: string, almacen: string }): void => {
    setOptions({ from, almacen })
  }
  const releaseInventories = async ({ paused = false }: { paused?: boolean }): Promise<void> => {
    dispatch(onStartInventories())

    try {
      await release({ paused })
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(onFinishInventories())
    }
  }

  return {
    inventory,
    inventories,
    isLoading,
    form,
    options,
    getAll,
    onLoadInventories,
    handleOnSubmit,
    handleliberarInventario,
    handleOnSearch,
    deleteCountbyId,
    handleOptions,
    getInventory,
    getShelterByAlmseq,
    getInventoryProscaiByIseq,
    releaseInventories
  }
}
