/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch, useAppSelector } from './useStore'
import { type Payment, type PaymentFormValues } from '../interfaces/Payment'
import { Form, type FormInstance } from 'antd'

import { type RefObject, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { addNewPayment, loadPayments, onStartPayment, selectPayment } from 'src/store/payments/slice'
import { type PaymentBody, createPayment, getAllPayments, getPaymentById } from 'src/services/payments'
import { toast } from 'sonner'

interface Props {
  payments: Payment[]
  payment: Payment | null
  form: FormInstance<any>
  isLoading: boolean
  handleOnSubmit: (values: PaymentFormValues) => void
  handleEdit: (value: PaymentFormValues) => void
  getById: ({ id }: { id: string }) => Promise<void>
  buttonSaveRef: RefObject<HTMLButtonElement>
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
    if (payment !== null) {
      // form.setFieldsValue({
      //   ...payment,
      //   supplier: payment?.supplier.name,
      //   idProscai: payment.supplier.idProscai,
      //   datePaid: dayjs(payment.datePaid)
      // })
    } else {
      form.resetFields()
    }
  }, [payment])

  const handleOnSubmit = async (values: PaymentFormValues): Promise<void> => {
    console.log(payment)

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
      const resp = await createPayment({ payment: newPayment })
      if (resp.error != null) {
        console.log(resp.error)
        return
      }

      console.log(resp)

      if (resp.payment !== undefined) {
        dispatch(addNewPayment(resp.payment))
        toast.success('Creado Correctamente')
      }
    } catch (error) {
      console.log(error)
    } finally {
      form.resetFields()
      // navigate('/payments')
    }
  }

  const handleEdit = async (value: PaymentFormValues): Promise<void> => {
    // const { datePaid, docto, paid, supplier, idProscai, id, comments } = value
    // const newPayment = {
    //   datePaid: dayjs(datePaid).toDate(),
    //   supplier,
    //   idProscai,
    //   docto,
    //   paid,
    //   comments
    // }

    // if (id !== undefined) {
    //   try {
    //     dispatch(onStartPayment())
    //     const paymentDB = await edit({ id, payment: newPayment })
    //     dispatch(editPayment({ ...paymentDB }))
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }

  const getById = async ({ id }: { id: string }): Promise<void> => {
    const { payment } = await getPaymentById({ id })

    dispatch(selectPayment(payment ?? null))
  }

  return {
    payments,
    payment,
    form,
    buttonSaveRef,
    isLoading,
    handleOnSubmit,
    handleEdit,
    getById
  }
}
