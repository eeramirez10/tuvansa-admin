import moment from 'moment'

export const formatDate = (date: string): string => {
  return moment(date).format('DD-MM-YYYY')
}
