import React, { useEffect, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import HC_exporting from 'highcharts/modules/exporting'

// HC_exporting(Highcharts)

const lineOptions: Highcharts.Options = {
  chart: {
    type: 'line'
  },

  title: {
    text: 'U.S Solar Employment Growth',
    align: 'center'
  },
  subtitle: {
    text: 'Venta anual $',
    align: 'center'
  },
  lang: { numericSymbols: ['k', ' M', ' B', ' T'] },

  yAxis: {
    title: {
      text: 'Ventas Mensuales'
    }
  },

  // legend: {
  //   layout: 'vertical',
  //   align: 'right',
  //   verticalAlign: 'middle'
  // },

  legend: {
    enabled: true
  },

  plotOptions: {
    // series: {
    //   color: '#FF0000'
    // },
    line: {
      dataLabels: {
        enabled: true,
        formatter: function (): any {
          const { y } = this
          return nFormatter(y ?? 0)
        }
      }

    },
    bar: {
      borderRadius: '50%',
      dataLabels: {
        enabled: true,
        align: 'right',
        formatter: function (): any {
          const { y } = this
          return nFormatter(y ?? 0)
        }
      },
      groupPadding: 0.1
    }
  },

  series: [
    {
      type: 'line',
      name: 'test',
      data: [43934, 48656, 65165, 81827, 112143, 142383,
        171533, 165174, 155157, 161454, 154610]
    }
  ],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }

}

interface Props {
  title?: string
  name?: string
  data?: Highcharts.SeriesOptionsType[]
  subtitle?: string
  type?: string
  seriesType?: Highcharts.SeriesLineOptions
  categories?: string[]
  color?: string
  legend?: boolean
}

export const LineChart: React.FC<Props> = ({
  title,
  name = '',
  data = [],
  subtitle = '',
  type = 'line',
  seriesType = 'line',
  categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  color = '#2caffe',
  legend = true
}) => {
  const [options, setOptions] = useState(lineOptions)

  useEffect(() => {
    if (data.length === 0) return
    setOptions({
      ...options,
      title: { ...options.title, text: title },
      chart: { ...options.chart, type },
      subtitle: { ...options.subtitle, text: subtitle },
      series: data,
      xAxis: { ...options.xAxis, categories },
      plotOptions: { ...options.plotOptions },
      legend: { ...options.legend, enabled: legend }

    })
  }, [title, type, subtitle, seriesType, data])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

function nFormatter (num: number): string | number {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num
}
