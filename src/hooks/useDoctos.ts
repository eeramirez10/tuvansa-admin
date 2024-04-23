import { type Docto } from 'src/interfaces/Docto'
import { useAppSelector } from './useStore'
import { getDoctoById } from 'src/services/docto'
import { loadDoctos, onStartDoctos, selectDocto } from 'src/store/doctos/slice'
import { useDispatch } from 'react-redux'
import { getAllDoctos } from '../services/docto'
import { toast } from 'sonner'
import { type PaymentBody, createPayment, getAllPayments } from 'src/services/payments'
import { Form, type FormInstance } from 'antd'
import { type PaymentFormValues } from 'src/interfaces/Payment'
import { COIN_VALUES } from './usePayments'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

interface Props {
  doctos: Docto[]
  docto: Docto | null
  isLoading: boolean
  getById: ({ id }: { id: string }) => Promise<void>
  getAll: ({ search }: { search?: string }) => Promise<void>
  handleOnSubmit: ({ values }: { values: any }) => Promise<void>
  form: FormInstance<any>
}

export const useDoctos = (): Props => {
  const doctos = useAppSelector(state => state.doctos.data)
  const docto = useAppSelector(state => state.doctos.selected)
  const isLoading = useAppSelector(state => state.doctos.isLoading)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getAll = async ({ search }: { search?: string }): Promise<void> => {
    dispatch(onStartDoctos())
    const resp = await getAllDoctos({ search })

    const respPayments = await getAllPayments()

    const payments = respPayments.payments?.filter(payment => payment.proscai !== null)

    // console.log(payments)
    // console.log(resp.doctos)

    if (resp.error !== undefined) {
      console.log(resp.error)
      dispatch(loadDoctos([]))
      return
    }
    dispatch(
      loadDoctos(
        resp.doctos !== undefined
          ? resp?.doctos.filter(docto => !((payments?.some(payment => payment.proscai?.idProscai === docto.idProscai)) ?? false))
          : []
      )
    )
  }

  const getById = async ({ id }: { id: string }): Promise<void> => {
    const { docto } = await getDoctoById({ id })

    dispatch(selectDocto(docto ?? null))
  }

  const handleOnSubmit = async ({ values }: { values: PaymentFormValues }): Promise<void> => {
    if (docto === undefined || docto === null) return

    const { supplier, amount, category, coin, datePaid, idSupplier, branchOffice, subcategory } = values

    const newPayment: PaymentBody = {
      idProscai: docto.idProscai,
      amount,
      category,
      creditor: null,
      coin: COIN_VALUES[coin],
      datePaid: dayjs(datePaid).toDate(),
      supplier: {
        uid: idSupplier,
        name: supplier
      },
      branchOffice,
      subcategory
    }

    try {
      dispatch(onStartDoctos())
      const resp = await createPayment({ payment: newPayment })
      if (resp.error != null) {
        console.log(resp.error)
        return
      }

      if (resp.payment !== undefined) {
        // dispatch(addNewD(resp.payment))
        toast.success('Creado Correctamente')
      }
    } catch (error) {
      console.log(error)
    } finally {
      form.resetFields()
      navigate('/payments')
    }
  }

  return {
    form,
    doctos,
    docto,
    isLoading,
    getById,
    getAll,
    handleOnSubmit
  }
}
