/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, type FormInstance, DatePicker, Row, Select, Flex, type RadioChangeEvent, InputNumber } from 'antd'
import { useButtonRef } from 'src/hooks/useButtonRef'
import { Radio } from 'antd'
import { SupplierAutoComplete } from 'src/components/SupplierAutoComplete/SupplierAutoComplete'
import { CreditorAutoComplete } from 'src/components/CreditorAutoComplete/CreditorAutoComplete'
import { type Docto } from 'src/interfaces/Docto'
import { getCategories } from 'src/services/categories'
import { type Subcategory } from 'src/interfaces/Category'

interface Props {
  form: FormInstance<any>
  onFinish: (value: any) => Promise<void> | void
  formValues?: Docto
  disabled?: boolean
  radioValue?: number
  isLoading?: boolean
}

interface CategoryOptions {
  id?: string
  name: string
  subcategories: Subcategory[]
  value: string
  label: JSX.Element

}

interface SubCategoryOptions {
  value: string
  label: JSX.Element
}

export const PaymentForm: React.FC<Props> = ({ form, onFinish, formValues, disabled = false, radioValue = 1, isLoading = false }) => {
  const { buttonRef } = useButtonRef()

  const [value, setValue] = useState(radioValue)

  const [categories, setCategories] = useState<CategoryOptions[]>([])

  const [subCategories, setSubCategories] = useState<SubCategoryOptions[]>([])

  const [isSubcategory, setSubcategory] = useState(false)

  useEffect(() => {
    setValue(radioValue)
  }, [radioValue])

  useEffect(() => {
    if (formValues !== undefined) {
      form.setFieldsValue({
        supplier: formValues.supplier.name,
        idSupplier: formValues.supplier.uid
      })
    }
  }, [formValues])

  useEffect(() => {
    getCategories()
      .then((resp) => {
        const { categories } = resp

        const categoriesOptions = categories.map((category) => ({
          value: category.id,
          label: <span>{category.name}</span>,
          ...category
        }))

        setCategories(categoriesOptions)
      })
  }, [])

  useEffect(() => {
    if (form.getFieldValue('subcategory')?.value !== undefined) {
      setSubcategory(true)
    }
  }, [form.getFieldValue('subcategory')?.value])

  console.log()

  const onChange = (e: RadioChangeEvent): void => {
    setValue(e.target.value)
  }

  const onSelectCategory = (_: any, option: any): void => {
    setSubCategories([])
    const categoriesOptions = categories.find(category => category.id === option.id)
    if (categoriesOptions?.subcategories.length === 0) return

    const subCategories = categoriesOptions?.subcategories.map(
      subcategories => ({
        value: subcategories.id,
        label: <span>{subcategories.name}</span>
      }))

    if (subCategories !== undefined) {
      setSubCategories(subCategories)
    }
  }

  return (
    <Card style={{ width: '100%' }} loading={isLoading}>
      <Radio.Group onChange={onChange} value={value} style={{ marginBottom: 20 }} disabled={disabled}>
        <Radio value={1}>Proveedor</Radio>
        <Radio value={2}>Acreedor | Deudor </Radio>
      </Radio.Group>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        style={{ width: '100%' }}

      >

        <Flex vertical>

          <Row gutter={[24, 16]}>
            {
              value === 1 &&

              <SupplierAutoComplete
                required={value === 1}
                form={form}
                disabled={disabled}
              />

            }
          </Row>

          {
            value === 2 &&
            <Row gutter={[24, 16]}>
              <CreditorAutoComplete
                required={value === 2}
                form={form}

              />
            </Row>
          }

          <Form.Item name="category" label="Categoria" rules={[{ required: true }]} style={{ width: 200 }}>
            <Select
              placeholder="Seleciona una cetegoria"
              allowClear
              options={categories}
              onSelect={onSelectCategory}
            />

          </Form.Item>

          {
            (subCategories.length > 0 || isSubcategory) &&

            <Form.Item name="subcategory" label="Subcategoria" rules={[{ required: true }]} style={{ width: 200 }}>
              <Select
                placeholder="Seleciona una cetegoria"
                allowClear
                options={subCategories}

              />

            </Form.Item>
          }

          <Form.Item
            name={'amount'}
            label='Importe'
            rules={[{ required: true }]}
          >
            <InputNumber />

          </Form.Item>

          <Form.Item name="coin" label="Moneda" rules={[{ required: true }]} style={{ width: 200 }}>
            <Select
              placeholder="Seleciona una una Moneda"
              allowClear
              options={[
                { value: 'MXN', label: 'MXN' },
                { value: 'USD', label: 'USD' }

              ]}
            />

          </Form.Item>

          <Form.Item name="branchOffice" label="Sucursal" rules={[{ required: true }]} style={{ width: 200 }}>
            <Select
              placeholder="Seleciona una Sucursal"
              allowClear
              options={[
                { value: 'Mexico', label: 'Mexico' },
                { value: 'Monterrey', label: 'Monterrey' },
                { value: 'Veracruz', label: 'Veracruz' },
                { value: 'Mexicali', label: 'Mexicali' },
                { value: 'Queretaro', label: 'Queretaro' },
                { value: 'Cancun', label: 'Cancun' }

              ]}
            />

          </Form.Item>

          <Form.Item
            name={'datePaid'}
            label='Fecha de pago'
            rules={[{ required: true }]}
          >
            <DatePicker />

          </Form.Item>

        </Flex>

        {/* <Form.Item
          name={'docto'}
          label='Docto'
          rules={[{ required: true }]}
        >
          <Input />

        </Form.Item>
        <Form.Item
          name={'paid'}
          label='Pagado'
          rules={[{ required: true, type: 'number' }]}
        >
          <InputNumber />

        </Form.Item> */}

        <Form.Item wrapperCol={{ span: 8, offset: 3 }}>
          <Button ref={buttonRef} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </Card >
  )
}
