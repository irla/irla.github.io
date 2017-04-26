const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dates = {
  short(dateStr) {
      const date = new Date(dateStr)
      if (date === "Invalid Date" || isNaN(date)) {
        return dateStr;
      }
      return months[date.getMonth()] + ' ' + date.getFullYear()
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
