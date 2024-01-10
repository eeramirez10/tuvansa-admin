import React from 'react'
import { Switch } from 'antd'
import { useTheme } from 'src/hooks/useTheme'
import { BulbFilled, BulbOutlined } from '@ant-design/icons'

export const SwitchTheme: React.FC = () => {
  const { theme, handleTheme } = useTheme()
  return (
    <Switch
      checkedChildren={<BulbFilled />}
      unCheckedChildren={<BulbOutlined />}
      checked={theme === 'light'}
      onChange={(cheked) => {
        handleTheme(cheked ? 'light' : 'dark')
      }}
    />
  )
}
