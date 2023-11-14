import { useAppDispatch, useAppSelector } from './useStore'
import { type Payment } from '../interfaces/Payment'
import { Form, type FormInstance } from 'antd'
import { addNewPayment, editPayment } from '../store/payments/slice'

interface Props {
  payments: Payment[]
  form: FormInstance<any>
  handleOnSubmit: (value: PaymentForm) => void
  handleEdit: (value: PaymentForm) => void
}

interface PaymentForm {
  payment: Payment
}

export const usePayments = (): Props => {
  const payments = useAppSelector(state => state.payments)
  const dispatch = useAppDispatch()

  const [form] = Form.useForm()

  const handleOnSubmit = (value: PaymentForm): void => {
    dispatch(addNewPayment(value.payment))
    form.resetFields()
  }

  const handleEdit = (value: PaymentForm): void => {
    dispatch(editPayment(value.payment))
  }

  return {
    payments,
    form,
    handleOnSubmit,
    handleEdit
  }
}
