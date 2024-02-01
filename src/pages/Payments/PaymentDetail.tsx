/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'src/components/Container/Container'
import { usePayments } from 'src/hooks/usePayments'
import { Form } from 'antd'
import { Navigation } from 'src/UI/Navigation/Navigation'
import { PaymentForm } from './components/PaymentForm/PaymentForm'
import { type PaymentFormValues } from 'src/interfaces/Payment'
import dayjs from 'dayjs'

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 }
// }

// const CATEGORY_VALUES: Array<{ value: string, label: JSX.Element }> = [
//   { value: 'mantenimiento', label: <span>Mantenimiento</span> }
// ]

export const PaymentDetail: React.FC = () => {
  const { id } = useParams()
  const { payment, getById, handleOnSubmit } = usePayments()
  const [form] = Form.useForm<PaymentFormValues>()

  const saveButtonRef = useRef(null)

  useEffect(() => {
    if (id !== undefined) {
      getById({ id })
    }
  }, [id])

  console.log(payment)

  useEffect(() => {
    if (payment !== null) {
      // const { } = payment
      form.setFieldsValue({
        supplier: payment.supplier?.name,
        idSupplier: payment.supplier?.uid,
        creditor: payment.creditor?.name,
        idCreditor: payment.creditor?.uid,
        category: payment.category,
        amount: payment.amount,
        coin: payment.coin.code,
        branchOffice: payment.branchOffice,
        datePaid: dayjs(payment.datePaid)
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
          radioValue={ payment?.supplier !== null ? 1 : 2}
        />

      </Container>

    </>
  )
}
