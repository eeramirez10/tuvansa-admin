/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from 'antd'
import React from 'react'

interface Props {
  handleOnRelease: ({ paused }: { paused?: boolean }) => Promise<void>
}

export const ReleaseInventories: React.FC<Props> = ({ handleOnRelease }) => {
  return (
    <Button
      onClick={() => handleOnRelease({})}
    >
      Liberar Todos
    </Button>
  )
}
