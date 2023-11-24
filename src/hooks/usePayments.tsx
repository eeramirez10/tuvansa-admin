/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch, useAppSelector } from './useStore'
import { type PaymentForm, type Payment } from '../interfaces/Payment'
import { Form, type FormInstance } from 'antd'

import { type RefObject, useRef, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { editPaymentT, getPayment, getPayments, postPayments } from 'src/store/payments/thunks'
import dayjs from 'dayjs'

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
      dispatch(getPayments())
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
    const { datePaid, docto, paid, supplier, idProscai, comments } = value
    const newPayment = {
      datePaid: dayjs(datePaid).toDate(),
      supplier,
      idProscai,
      docto,
      paid,
      comments
    }

    try {
      await dispatch(postPayments(newPayment))
    } catch (error) {
      console.log(error)
    } finally {
      form.resetFields()
      navigate('/payments')
    }
  }

  const handleEdit = (value: PaymentForm): void => {
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
      dispatch(editPaymentT({ id, payment: newPayment }))
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
