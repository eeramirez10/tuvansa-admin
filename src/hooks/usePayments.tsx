/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch, useAppSelector } from './useStore'
import { type Payment, type PaymentFormValues } from '../interfaces/Payment'
import { Form, type FormInstance } from 'antd'

import { type RefObject, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { addNewPayment, loadPayments, onStartPayment, selectPayment } from 'src/store/payments/slice'
import { type PaymentBody, createPayment, getAllPayments, getPaymentById, editPaymentService } from 'src/services/payments'
import { toast } from 'sonner'

interface Props {
  payments: Payment[]
  payment: Payment | null
  form: FormInstance<any>
  isLoading: boolean
  buttonSaveRef: RefObject<HTMLButtonElement>
  handleOnSubmit: (values: PaymentFormValues) => void
  getById: ({ id }: { id: string }) => Promise<void>
  setFormValues: (paymet: Payment) => void
}

export const COIN_VALUES = {
  MXN: {
    code: 'MXN',
    name: 'pesos'
  },
  USD: {
    code: 'USD',
    name: 'dolares'
  }
}

export const usePayments = (): Props => {
  const payments = useAppSelector(state => state.payments.data)
  const payment = useAppSelector(state => state.payments.selected)
  const isLoading = useAppSelector(state => state.payments.isLoading)

  const dispatch = useAppDispatch()
  const buttonSaveRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

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

  const handleOnSubmit = async (values: PaymentFormValues): Promise<void> => {
    const { supplier, creditor, amount, category, coin, datePaid, idCreditor, idSupplier, branchOffice } = values

    const newPayment: PaymentBody = {
      datePaid: dayjs(datePaid).toDate(),
      supplier: supplier !== undefined
        ? {
            name: supplier.trim(),
            uid: idSupplier
          }
        : null,
      creditor: creditor !== undefined
        ? {
            name: creditor.trim(),
            uid: idCreditor
          }
        : null,
      amount,
      category,
      coin: COIN_VALUES[coin],
      idProscai: null,
      branchOffice
    }

    try {
      dispatch(onStartPayment())

      const isPayment = payment?.id !== null && payment?.id !== undefined

      const resp = isPayment
        ? await editPaymentService({ payment: newPayment, id: payment.id })
        : await createPayment({ payment: newPayment })

      if (resp.error != null) return

      if (resp.payment !== undefined) {
        dispatch(addNewPayment(resp.payment))
        toast.success('Creado Correctamente')
      }
    } catch (error) {

    } finally {
      form.resetFields()
      navigate('/payments')
    }
  }

  const getById = async ({ id }: { id: string }): Promise<void> => {
    dispatch(onStartPayment())
    const { payment } = await getPaymentById({ id })
    dispatch(selectPayment(payment ?? null))
  }

  const setFormValues = (payment: Payment): void => {
    const {
      supplier,
      creditor,
      category,
      amount,
      coin,
      branchOffice,
      datePaid
    } = payment

    form.setFieldsValue({
      supplier: supplier?.name,
      idSupplier: supplier?.uid,
      creditor: creditor?.name,
      idCreditor: creditor?.uid,
      category,
      amount,
      coin: coin.code,
      branchOffice,
      datePaid: dayjs(datePaid)
    })
  }

  return {
    payments,
    payment,
    form,
    buttonSaveRef,
    isLoading,
    handleOnSubmit,
    getById,
    setFormValues
  }
}
