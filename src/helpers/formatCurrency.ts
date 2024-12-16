export const currencyMXNFormat = ({ value }: { value: number }): string => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
    value
  )
}
