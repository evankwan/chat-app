export const formatDate = (date) => {
  // "JUL 30 AT 1:00 P.M."
    const month = formatMonth(date.getMonth());
    const day = date.getDate();
    const hour = formatHour(date.getHours());
    const minutes = date.getMinutes();

    return `${month} ${day} AT ${hour.hour}:${minutes} ${hour.ampm}`
}

const formatHour = (hour) => {
  if (hour > 12) {
    return {
      hour: hour - 12,
      ampm: `P.M.`,
    }
  } else if (hour === 12) {
    return {
      hour: hour,
      ampm: `P.M.`,
    }
  } else if (hour === 0) {
    return {
      hour: 12,
      ampm: `A.M.`,
    }
  } else {
    return {
      hour: hour,
      ampm: `A.M.`,
    }
  }
}

const formatMonth = (month) => {
  switch (month) {
    case 0 : return 'JAN'
    case 1 : return 'FEB'
    case 2 : return 'MAR'
    case 3 : return 'APR'
    case 4 : return 'MAY'
    case 5 : return 'JUN'
    case 6 : return 'JUL'
    case 7 : return 'AUG'
    case 8 : return 'SEP'
    case 9 : return 'OCT'
    case 10 : return 'NOV'
    case 11 : return 'DEC'
    default : break
  }
}