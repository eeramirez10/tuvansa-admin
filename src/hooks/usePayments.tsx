/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch, useAppSelector } from './useStore'
import { type PaymentForm, type Payment } from '../interfaces/Payment'
import { Form, type FormInstance } from 'antd'

import { type RefObject, useRef, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getPayment } from 'src/store/payments/thunks'
import dayjs from 'dayjs'
import { addNewPayment, editPayment, loadPayments, onStartPayment } from 'src/store/payments/slice'
import { createPayment, edit, getAllPayments } from 'src/services/payments'
import { toast } from 'sonner'

interface Props {
  payments: Payment[]
  payment: Payment | null
  form: FormInstance<any>
  isLoading: boolean
  handleOnSubmit: (value: PaymentForm) => void
  handleEdit: (value: PaymentForm) => void
  buttonSaveRef: RefObject<HTMLButtonElement>
}

export const usePayments = (): Props => {
  const { id } = useParams()
  const payments = useAppSelector(state => state.payments.data)
  const payment = useAppSelector(state => state.payments.selected)
  const isLoading = useAppSelector(state => state.payments.isLoading)

  const dispatch = useAppDispatch()
  const buttonSaveRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const [form] = Form.useForm()

  useEffect(() => {
    if (location.pathname === '/payments') {
      dispatch(onStartPayment())
      getAllPayments()
        .then((resp) => {
          if (resp.error !== undefined) {
            console.log(resp.error)
            dispatch(loadPayments([]))
            return
          }
          dispatch(loadPayments(resp.payments !== undefined ? resp?.payments : []))
        })
        .catch(e => {
          console.log(e)
        })
    }
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getPayment({ id }))
    }
  }, [])

  useEffect(() => {
    if (payment !== null) {
      form.setFieldsValue({
        ...payment,
        supplier: payment?.supplier.name,
        idProscai: payment.supplier.idProscai,
        datePaid: dayjs(payment.datePaid)
      })
    } else {
      form.resetFields()
    }
  }, [payment])

  const handleOnSubmit = async (value: PaymentForm): Promise<void> => {
    const { datePaid, docto, paid, supplier: name, idProscai, comments } = value
    const newPayment = {
      datePaid: dayjs(datePaid).toDate(),
      supplier: {
        name,
        idProscai
      },
      docto,
      paid,
      comments
    }

    try {
      dispatch(onStartPayment())
      const resp = await createPayment({ payment: newPayment })
      if (resp.error != null) {
        console.log(resp.error)
        return
      }

      if (resp.payment !== undefined) {
        dispatch(addNewPayment(resp.payment))
        toast.success('Creado Correctamente')
      }
    } catch (error) {
      console.log(error)
    } finally {
      form.resetFields()
      navigate('/payments')
    }
  }

  const handleEdit = async (value: PaymentForm): Promise<void> => {
    const { datePaid, docto, paid, supplier, idProscai, id, comments } = value
    const newPayment = {
      datePaid: dayjs(datePaid).toDate(),
      supplier,
      idProscai,
      docto,
      paid,
      comments
    }

    if (id !== undefined) {
      try {
        dispatch(onStartPayment())
        const paymentDB = await edit({ id, payment: newPayment })
        dispatch(editPayment({ ...paymentDB }))
      } catch (error) {
        console.log(error)
      }
    }
  }

  return {
    payments,
    payment,
    form,
    buttonSaveRef,
    isLoading,
    handleOnSubmit,
    handleEdit
  }
}
