const locale = 'en-EN'
const dates = {
  short(dateStr) {
      const date = new Date(dateStr)
      if (date === "Invalid Date" || isNaN(date)) {
        return dateStr;
      }
      const month = date.toLocaleString(locale, {month: "long"})
      return month + ' ' + date.getFullYear()
  },
  range(fromStr, toStr) {
    const from = this.short(fromStr)
    const to = this.short(toStr)
    if (from == to) {
      return from
    }
    return from + ' - ' + to
  }
}

const filtering = () => {

}


export {dates, filtering}
