import React, { useEffect } from 'react'
import { PaymentForm } from './components/PaymentForm/PaymentForm'
import { usePayments } from '../../hooks/usePayments'
import { Navigation } from 'src/UI/Navigation/Navigation'

export const NewPayment: React.FC = () => {
  const { form, handleOnSubmit } = usePayments()

  useEffect(() => {
    form.resetFields()
  })

  return (
    <>
      <Navigation name='Pago Nuevo' isNew={false} />
      <PaymentForm
        form={form}
        onFinish={handleOnSubmit}
      />
    </>

  )
}
