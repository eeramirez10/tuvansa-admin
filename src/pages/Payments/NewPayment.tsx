import React, { useEffect } from 'react'
import { PaymentForm } from './components/PaymentForm/PaymentForm'
import { usePayments } from '../../hooks/usePayments'

export const NewPayment: React.FC = () => {
  const { form, handleOnSubmit } = usePayments()

  useEffect(() => {
    form.resetFields()
  })

  return (
    <PaymentForm
      form={form}
      onFinish={handleOnSubmit}
    />
  )
}
