/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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

  const [ingresos, setIngresos] = useState<{
    RfcEmisor: string
    NombreRazonSocialEmisor: string
    data: Competition[]
    series: [{
      name: string
      data: number[]
    }]
  }>()

  useEffect(() => {
    getCompetitions()
      .then((resp) => {
        const { competitions } = resp

        setCompetitions(competitions)
      })
  }, [])

  const handleClick = async (RfcEmisor: string): Promise<void> => {
    let ingresosData: Competition[] = []

    let series: [{
      name: string
      data: number[]
    }] = [{ name: '', data: [] }]

    for (const year of ['2022', '2023']) {
      const { competition } = await getCompetition({ RfcEmisor, year })

      if (!competition) continue

      ingresosData = [...ingresosData, competition]

      const competionInfo: {
        name: string
        data?: number[]
      } = {
        name: `${competition.anio}`,
        data: competition.ingresos?.map(ingreso => ingreso.subTotalPorMes)
      }

      series = [...series, competionInfo]
    }
    console.log(series)

    setIngresos({
      RfcEmisor,
      NombreRazonSocialEmisor: ingresosData[0].NombreRazonSocialEmisor,
      data: series
    })

    getCustomersByCompetition({ RfcEmisor })
      .then((resp) => {
        setCustomers(resp.customers.slice(0, 10))
      })
  }

  console.log(ingresos)

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
              competitions.map((competition) => (
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

          <>

            <Col md={12} sm={24}>
              <LineChart
                title={`${competition?.NombreRazonSocialEmisor} - INGRESOS - ${competition?.anio}`}
                subtitle={`Venta ${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(sumSubtotal)}`}
                color='#00cd00'
                data={ingresos?.data}

              />

            </Col>

            <Col md={12} sm={24}>
              <LineChart
                title={`TOP CLIENTES - ${competition?.NombreRazonSocialEmisor} - ${competition?.anio}`}
                subtitle=''
                data={subTotalCustomers}
                type='bar'
                seriesType='bar'
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