interface DateRangeProps {
    from: string,
    to: string,
    size: "sm" | "xs"
}

export const DateRange: React.FC<DateRangeProps> = ({from, to, size}) => {
    const fromDate = new Date(from)
    const toDate = new Date(to)
    const fromStr = isNaN(fromDate.getTime()) ? from : fromDate.toLocaleString('en', { month: 'long', year: 'numeric'})
    const toStr = isNaN(toDate.getTime()) ? to : toDate.toLocaleString('en', { month: 'long', year: 'numeric'})
    return <div className={`text-${size}`}><span className="whitespace-nowrap">{fromStr}</span> - <span className="whitespace-nowrap">{toStr}</span></div>
}