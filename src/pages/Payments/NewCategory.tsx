import React from 'react'
import { Container } from 'src/components/Container/Container'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'

export const NewCategory: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any): void => {
    console.log(values.items[0])
  }
  return (
    <Container>
      <h1>New Category</h1>

      <Form

        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: '100vw' }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
        onFinish={onFinish}
      >
        <Form.List name="items">
          {(fields) => {
            const field = fields[0]
            return (
              <div style={{ display: 'flex', alignItems: 'flex-start', rowGap: 16, flexDirection: 'column' }}>
                {
                  <div
                    key={field.key}
                  >

                    <Form.Item label="Name" name={[field.name, 'name']}>
                      <Input />
                    </Form.Item>

                    {/* Nest Form.List */}
                    <Form.Item label="Subcategoria" >
                      <Form.List name={[field.name, 'subcategories']}>
                        {(subFields, subOpt) => (
                          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item noStyle name={[subField.name, 'name']}>
                                  <Input placeholder="name" />
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name)
                                  }}
                                />
                              </Space>
                            ))}
                            <Button type="dashed" onClick={() => { subOpt.add() }} block>
                              + Agregar Subcategoria
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>

                  </div>

                }
                <Form.Item >
                  <Button type="primary" htmlType="submit">
                    Guardar
                  </Button>
                </Form.Item>
              </div>
            )
          }}

        </Form.List>
      </Form>
    </Container >
  )
}
