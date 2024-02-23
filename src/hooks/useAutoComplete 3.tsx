/* eslint-disable @typescript-eslint/no-misused-promises */
import { type FormInstance } from 'antd'
import { useState } from 'react'
import { getSuppliersProscai } from 'src/services/supplier'

interface AutoComplete {
  options: Array<{ label: string, value: string, id: string }>
  open: boolean
  isLoading: boolean
  onSearch: (text: string) => Promise<void>
  onSelect: (_value: any, values: { label: string, value: string, id: string }) => void
}

interface Props {
  form: FormInstance<any>

}

export const useAutoComplete = ({ form }: Props): AutoComplete => {
  const [options, setOptions] = useState<Array<{ label: string, value: string, id: string }>>([])
  const [open, setOpen] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  let filterTimeout: any

  const onSelect = (_value: any, values: { label: string, value: string, id: string }): void => {
    setOpen(false)
    form.setFieldsValue({ idSupplier: values.id })
  }

  const onSearch = async (text: string): Promise<void> => {
    clearTimeout(filterTimeout)

    if (text === '' || text === null) return

    filterTimeout = setTimeout(async () => {
      console.log('====>', text)

      setIsloading(true)
      setOpen(false)
      try {
        const { suppliers } = await getSuppliersProscai({ search: text })

        const optionsDB = suppliers.map(({ name, uid }) => ({
          label: name,
          value: name,
          id: uid
        }))

        setOptions(optionsDB)
      } catch (error) {
        console.log(error)
      } finally {
        setIsloading(false)
        setOpen(true)
      }
    }, 1000)
  }

  return {
    options,
    open,
    isLoading,
    onSearch,
    onSelect

  }
}
