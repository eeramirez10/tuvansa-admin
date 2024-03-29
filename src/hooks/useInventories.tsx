import { useAppDispatch, useAppSelector } from './useStore'
import { loadInventories, onStartInventories, selectInventory } from 'src/store/inventories/slice'
import { type Inventory } from 'src/interfaces/Inventory'
import { deleteInventoryCount, getByIseq, getInventories, getInventoryProscai, liberarInventory, postInventory } from 'src/services/inventories'
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
    const [inventory, inventoryProscai] = await Promise.all([getByIseq({ iseq: id }), getInventoryProscai({ id })])
    dispatch(selectInventory(inventory.inventory ?? inventoryProscai.inventory))
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

  const handleOnSubmit = async (value: { count: number }): Promise<void> => {
    const newInventory: any = {
      ...inventory,
      count: value.count
    }

    try {
      const resp = await postInventory({ inventory: newInventory })

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

  return {
    inventory,
    inventories,
    isLoading,
    form,
    options,
    onLoadInventories,
    handleOnSubmit,
    handleliberarInventario,
    handleOnSearch,
    deleteCountbyId,
    handleOptions,
    getInventory,
    getShelterByAlmseq
  }
}
