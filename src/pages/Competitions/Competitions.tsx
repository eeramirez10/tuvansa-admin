/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Col, Radio, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Container } from 'src/components/Container/Container'
import { LineChart } from 'src/components/LineChart/LineChart'
import { type CompetitionCustomer, type Competition } from 'src/interfaces/Competition'
import { getCompetition, getCompetitions, getCustomersByCompetition, getRecibidasByRfcEmisor, getRecibidasByRfcReceptor } from '../../services/competitions'
import { currencyMXNFormat } from 'src/helpers/formatCurrency'

interface CustomerChart {
  year: number
  NombreRazonSocialEmisor: string
  categories: string[]
  series: Highcharts.SeriesOptionsType[]
}

interface CompetitonChart {
  RfcEmisor: string
  NombreRazonSocialEmisor: string
  series: Highcharts.SeriesOptionsType[]
}

const COLORS = {
  PRIMARY: '#33A8FF',
  SECONDARY: '#8333FF'
}

export const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [competition, setCompetition] = useState<CompetitonChart>()
  const [customers, setCustomers] = useState<CustomerChart[]>()
  const [competitionsRecibidas, setCompetitionsRecibidas] = useState<CustomerChart[]>()

  const [emisorRecibidas, setEmisorRecibidas] = useState<CustomerChart[]>()

  useEffect(() => {
    getCompetitions()
      .then((resp) => {
        const { competitions } = resp

        const com = competitions
          .filter(com => com.RfcEmisor !== null)
          .sort((a, b) => a.RfcEmisor.localeCompare(b.NombreRazonSocialEmisor))

        setCompetitions(com)
      })

    getTamsaData()
      .then(resp => {
        const customerInfo: Highcharts.SeriesOptionsType[] = [{
          name: `${resp[0].anio}`,
          data: resp?.map(ingreso => ingreso.subTotalPorAnio),
          type: 'bar',
          color: COLORS.PRIMARY

        }]

        setEmisorRecibidas([{
          year: resp[0].anio,
          NombreRazonSocialEmisor: 'TAMSA',
          categories: resp.map(customer => customer.NombreRazonSocialReceptor),
          series: customerInfo
        }])
      })
  }, [])

  console.log(emisorRecibidas)

  const setDataVentaMensual = ({ competition }: { competition: Competition }): CompetitonChart => {
    const totalAnual = competition.ingresos?.reduce((acc, val) => acc + val.totalPorMes, 0)

    return {
      RfcEmisor: competition.RfcEmisor,
      NombreRazonSocialEmisor: competition.NombreRazonSocialEmisor,
      series: [
        {
          name: `${competition.anio} - venta anual ${currencyMXNFormat({ value: totalAnual ?? 0 })}`,
          data: competition.ingresos?.map(ingreso => ingreso.totalPorMes),
          type: 'line',
          color: competition.anio === 2023 ? COLORS.SECONDARY : COLORS.PRIMARY

        }
      ]
    }
  }

  const handleClick = async (RfcEmisor: string): Promise<void> => {
    let ingresosData: CompetitonChart = {
      RfcEmisor: '',
      NombreRazonSocialEmisor: '',
      series: []
    }

    let customersData: CustomerChart[] = []

    let recibidasData: CustomerChart[] = []

    for (const year of ['2022', '2023']) {
      const { competition } = await getCompetition({ RfcEmisor, year })

      if (!competition) continue

      const ventaMensual = setDataVentaMensual({ competition })

      ingresosData = {
        ...ingresosData,
        ...ventaMensual,
        series: [...ingresosData.series, ...ventaMensual.series]

      }

      const { customers } = await getCustomersByCompetition({ RfcEmisor, year })

      const { customers: prov } = await getRecibidasByRfcReceptor({ RfcReceptor: RfcEmisor, year })

      const customerInfo: Highcharts.SeriesOptionsType[] = [{
        name: `${customers[0].anio}`,
        data: customers?.map(ingreso => ingreso.subTotalPorAnio),
        type: 'bar',
        color: year === '2023' ? COLORS.SECONDARY : COLORS.PRIMARY

      }]

      if (prov.length > 0) {
        const recibidasInfo: Highcharts.SeriesOptionsType[] = [{
          name: `${prov[0].anio}`,
          data: prov?.map(ingreso => ingreso.subTotalPorAnio),
          type: 'bar',
          color: 'red'

        }]

        recibidasData = [
          ...recibidasData,
          {
            year: prov[0].anio,
            NombreRazonSocialEmisor: competition.NombreRazonSocialEmisor,
            categories: prov.map(customer => customer.NombreRazonSocialEmisor),
            series: recibidasInfo
          }
        ]
      }

      customersData = [
        ...customersData,
        {
          year: customers[0].anio,
          NombreRazonSocialEmisor: competition.NombreRazonSocialEmisor,
          categories: customers.map(customer => customer.NombreRazonSocialReceptor),
          series: customerInfo
        }
      ]
    }

    setCompetition(ingresosData)

    setCustomers(customersData)

    setCompetitionsRecibidas(recibidasData)
  }

  const getTamsaData = async (): Promise<CompetitionCustomer[]> => {
    const resp = await getRecibidasByRfcEmisor({ RfcEmisor: 'TAM520130D49', year: '2023' })

    return resp.customers
  }

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
                title={`${competition?.NombreRazonSocialEmisor} - INGRESOS`}
                data={competition?.series}

              />

            </Col>

            {
              customers?.map(customer => (
                <Col md={12} sm={24} key={customer.year}>
                  <LineChart
                    title={`TOP CLIENTES - ${customer.NombreRazonSocialEmisor} - ${customer.year}`}
                    subtitle=''
                    data={customer.series}
                    type='bar'
                    categories={customer.categories}
                    color='#00cd00'
                    legend={false}
                  />
                </Col>
              ))
            }

            {
              competitionsRecibidas?.map(customer => (
                <Col md={12} sm={24} key={customer.year}>
                  <LineChart
                    title={`RECIBIDAS - ${customer.NombreRazonSocialEmisor} - ${customer.year}`}
                    subtitle=''
                    data={customer.series}
                    type='bar'
                    categories={customer.categories}
                    color='#00cd00'
                    legend={false}
                  />
                </Col>
              ))
            }

            {
              emisorRecibidas?.map(customer => (
                <Col md={12} sm={24} key={customer.year}>
                  <LineChart
                    title={`Emitidas - ${customer.NombreRazonSocialEmisor} - ${customer.year}`}
                    subtitle=''
                    data={customer.series}
                    type='bar'
                    categories={customer.categories}
                    color='#00cd00'
                    legend={false}
                  />
                </Col>
              ))
            }

          </>

        }

      </Row>

    </Container>
  )
}
