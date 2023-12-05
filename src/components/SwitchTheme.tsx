import React from 'react'
import { Switch } from 'antd'
import { useTheme } from 'src/hooks/useTheme'
import { BulbFilled, BulbOutlined } from '@ant-design/icons'

export const SwitchTheme: React.FC = () => {
  const { theme, handleTheme } = useTheme()
  return (
    <Switch
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        width: 50
      }}
      checkedChildren={<BulbFilled />}
      unCheckedChildren={ <BulbOutlined />}
      checked={theme === 'light'}
      onChange={(cheked) => {
        handleTheme(cheked ? 'light' : 'dark')
      }}
    />
  )
}
