interface PillProps {
    label: string,
}

export const Pill: React.FC<PillProps> = ({children, label}) => {
    return <div className="group select-none inline-block mr-1 mb-1 px-1 text-xs border border-slate-900 rounded-md bg-slate-50 shadow-sm shadow-slate-300 hover:text-white hover:bg-slate-600">
    {label}
    {(children != null) && <div className="hidden absolute group-hover:block bg-slate-600 border-slate-900 rounded-md max-w-xs border mt-1 p-1 shadow-sm">{children}</div>}
</div>
}