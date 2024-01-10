import React from 'react'
import { PaymentForm } from './components/PaymentForm/PaymentForm'
import { usePayments } from '../../hooks/usePayments'
export const PaymentEdit: React.FC = () => {
  const { form, handleEdit } = usePayments()

  return (
    <PaymentForm
      form={form}
      onFinish={handleEdit}
    />
  )
}
