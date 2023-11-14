import React from 'react'
import { PaymentForm } from './components/PaymentForm/PaymentForm'
import { usePayments } from '../../hooks/usePayments'

export const NewPayment: React.FC = () => {
  const { form, handleOnSubmit } = usePayments()
  return (
    <PaymentForm
      form={form}
      onFinish={handleOnSubmit}
    />
  )
}
