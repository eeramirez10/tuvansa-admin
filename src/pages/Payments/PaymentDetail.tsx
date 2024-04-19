/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'src/components/Container/Container'
import { usePayments } from 'src/hooks/usePayments'
import { Navigation } from 'src/UI/Navigation/Navigation'
import { PaymentForm } from './components/PaymentForm/PaymentForm'
import { type PaymentFormValues } from 'src/interfaces/Payment'

export const PaymentDetail: React.FC = () => {
  const { id } = useParams()
  const { payment, getById, handleOnSubmit, setFormValues, form, isLoading } = usePayments()

  const saveButtonRef = useRef(null)

  useEffect(() => {
    if (id !== undefined) {
      getById({ id })
    }
  }, [id])

  useEffect(() => {
    if (payment !== null) {
      console.log(payment)
      setFormValues({
        ...payment,
        category: {
          value: payment.category.id,
          label: <span>{payment.category.name}</span>
        },
        subcategory: {
          value: payment.subcategory.id,
          label: <span>{payment.subcategory.name}</span>
        }
      })
    }
  }, [payment])

  const onFinish = (values: PaymentFormValues) => {
    if (payment === undefined || payment === null) return

    handleOnSubmit(values)
  }

  return (
    <>
      <Navigation
        name='Detalle de Pago'
        isNew={false}
        hasFile={payment !== null ? payment.files.length > 0 : false}
        saveRef={saveButtonRef}
      />
      <Container>

        <PaymentForm
          form={form}
          onFinish={onFinish}
          radioValue={payment?.supplier !== null ? 1 : 2}
          isLoading={isLoading}
        />

      </Container>

    </>
  )
}
