interface DateRangeProps {
    from: string,
    to: string,
}

export const DateRange: React.FC<DateRangeProps> = ({from, to}) => {
    const fromDate = new Date(from)
    const toDate = new Date(to)
    const fromStr = isNaN(fromDate.getTime()) ? from : fromDate.toLocaleString('en', { month: 'long', year: 'numeric'})
    const toStr = isNaN(toDate.getTime()) ? to : toDate.toLocaleString('en', { month: 'long', year: 'numeric'})
    return <div>{fromStr} - {toStr}</div>
}