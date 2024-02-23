import { Col, Radio, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Container } from 'src/components/Container/Container'
import { LineChart } from 'src/components/LineChart/LineChart'
import { type CompetitionCustomer, type Competition } from 'src/interfaces/Competition'
import { getCompetition, getCompetitions, getCustomersByCompetition } from '../../services/competitions'

export const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [competition, setCompetition] = useState<Competition>()
  const [customers, setCustomers] = useState<CompetitionCustomer[]>()

  useEffect(() => {
    getCompetitions()
      .then((resp) => {
        const { competitions } = resp

        setCompetitions(competitions)
      })
  }, [])

  const handleClick = (RfcEmisor: string): void => {
    getCompetition({ RfcEmisor })
      .then((resp) => {
        const { competition } = resp

        setCompetition(competition)
      })

    getCompetition({ RfcEmisor, EfectoComprobante: 'Egreso' })
      .then(resp => {
        const { competition } = resp

        console.log(competition)

        setCompetition(prevState => ({ ...prevState, egresos: [...competition.ingresos] }))
      })

    getCustomersByCompetition({ RfcEmisor })
      .then((resp) => {
        setCustomers(resp.customers.slice(0, 10))
      })
  }

  console.log(competition)

  const data = competition !== undefined ? competition.ingresos?.map(ingreso => ingreso.subTotalPorMes) : []

  const sumSubtotal = competition?.ingresos?.reduce((prev, current) => prev + current.subTotalPorMes, 0) ?? 0

  const customersName = customers?.map(customer => customer.NombreRazonSocialReceptor)
  const subTotalCustomers = customers?.map(customer => customer.subTotalPorAnio)

  return (
    <Container>

      <Row gutter={[32, 32]}>

        <Col md={24} sm={24}>
          {/* <Flex vertical gap="small" style={{ width: '100%' }}>
            {
              competitions.map(competition => (
                <Button key={competition.RfcEmisor} onClick={() => { handleClick(competition.RfcEmisor) }} type="primary" block>
                  {competition.NombreRazonSocialEmisor}
                </Button>

              ))
            }
          </Flex> */}

        </Col>

        <Col md={24}>
          <Radio.Group defaultValue="a" buttonStyle="solid">
            {
              competitions.map(competition => (
                <Radio.Button
                  key={competition.RfcEmisor}
                  value={competition.RfcEmisor}
                  onClick={() => { handleClick(competition.RfcEmisor) }}
                >
                  {competition.NombreRazonSocialEmisor}
                </Radio.Button>
              ))
            }
          </Radio.Group>
        </Col>

        {

          competition !== undefined &&

          <>

            <Col md={12} sm={24}>
              <LineChart
                title={`${competition?.NombreRazonSocialEmisor} - INGRESOS - ${competition?.anio}`}
                subtitle={`Venta ${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(sumSubtotal)}`}
                color='#00cd00'
                data={data}

              />

            </Col>

            <Col md={12} sm={24}>
              <LineChart
                title={`TOP CLIENTES - ${competition?.NombreRazonSocialEmisor} - ${competition?.anio}`}
                subtitle=''
                data={subTotalCustomers}
                type='bar'
                seriesType = 'bar'
                categories={customersName}
                color='#00cd00'

              />

            </Col>

          </>

        }

      </Row>

    </Container>
  )
}
