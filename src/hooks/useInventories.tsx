import { useAppDispatch, useAppSelector } from './useStore'
import { loadInventories, onStartInventories, selectInventory } from 'src/store/inventories/slice'
import { type Inventory } from 'src/interfaces/Inventory'
import { getByIseq, getInventories, getInventoryProscai, liberarInventory, postInventory } from 'src/services/inventories'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Form, type FormInstance } from 'antd'
import { toast } from 'sonner'
import { deleteCount } from 'src/services/counts'

interface InventoryReturn {
  inventory: Inventory | null
  inventories: Inventory[]
  isLoading: boolean
  form: FormInstance<any>
  onLoadInventories: ({ from }: { from?: string }) => Promise<void>
  handleOnSubmit: (value: { count: number }) => Promise<void>
  handleliberarInventario: () => Promise<void>
  handleOnSearch: (value: { search: string }) => Promise<void>
  deleteCountbyId: ({ id }: { id: string }) => Promise<void>
}

export const useInventories = (): InventoryReturn => {
  const { id } = useParams()
  const inventories = useAppSelector(state => state.inventories.data)
  const inventory = useAppSelector(state => state.inventories.selected)
  const isLoading = useAppSelector(state => state.inventories.isLoading)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (id !== undefined) {
      fetchInventories({ id })
    }
  }, [id])

  const fetchInventories = async ({ id }: { id: string }): Promise<void> => {
    const [inventory, inventoryProscai] = await Promise.all([getByIseq({ iseq: id }), getInventoryProscai({ id })])
    dispatch(selectInventory(inventory.inventory ?? inventoryProscai.inventory))
  }

  const deleteCountbyId = async ({ id }: { id: string }): Promise<void> => {
    try {
      await deleteCount({ id })

      if (inventory === null) return

      const newCount = inventory?.counts?.filter(count => count.id !== id)

      const newInventory: Inventory = { ...inventory, counts: newCount }

      dispatch(selectInventory(newInventory))
    } catch (error) {
      toast.error('hubo un error')
    }
  }

  const onLoadInventories = async ({ from = '' }: { from?: string }): Promise<void> => {
    dispatch(onStartInventories())

    getInventories({ from })
      .then((resp) => {
        const { inventories } = resp
        const { items } = inventories
        dispatch(loadInventories(items.map(item => ({ ...item, id: item.id ?? item.iseq }))))
      })
  }

  const handleOnSearch = async (value: { search: string }): Promise<void> => {
    try {
      dispatch(onStartInventories())
      const resp = await getInventories({ search: value.search, from: 'proscai' })

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

  return {
    inventory,
    inventories,
    isLoading,
    form,
    onLoadInventories,
    handleOnSubmit,
    handleliberarInventario,
    handleOnSearch,
    deleteCountbyId
  }
}
