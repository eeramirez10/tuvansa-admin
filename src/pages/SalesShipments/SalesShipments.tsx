import React, { useEffect, useRef, useState } from 'react'
import { Shipments } from '../Shipments/Shipments'
import { Sales } from '../Sales/Sales'
import { CronJob } from 'cron'

export const SalesShipments: React.FC = () => {
  const [salesView, setSalesView] = useState<boolean>(true)
  const cronJob = useRef<CronJob<null, null>>()

  useEffect(() => {
    cronJob.current = new CronJob('* * * * *', () => {
      console.log(!salesView)
      setSalesView(!salesView)
    })

    cronJob.current.start()

    return () => {
      cronJob.current?.stop()
    }
  }, [salesView])

  console.log(salesView)

  return (

    <>

      {
        salesView
          ? <Sales />
          : <Shipments />
      }
    </>

  )
}
