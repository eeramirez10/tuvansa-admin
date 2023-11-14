import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PaymentForm } from './components/PaymentForm/PaymentForm'
import { usePayments } from '../../hooks/usePayments'
export const PaymentEdit: React.FC = () => {
  const { form, handleEdit, payments } = usePayments()
  const { id } = useParams()

  useEffect(() => {
    if (id !== undefined || id !== null) {
      const payment = payments.find(payment => payment.id === id)
      form.setFieldsValue({ payment })
    }
  }, [])

  return (
    <PaymentForm
      form={form}
      onFinish={handleEdit}
    />
  )
}
