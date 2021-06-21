import moment from 'moment'

export function getFormattedData (timeS, format = 'MMMM, DD YYYY') {
  return moment(timeS * 1000).utc().format(format)
}
