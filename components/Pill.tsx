interface PillProps {
    label: string,
    highlighted: boolean,
    onClick?: (value: string) => void
}

export const Pill: React.FC<PillProps> = ({children, label, highlighted, onClick}) => {
    const classColors = highlighted ?
        "text-white bg-slate-600 hover:text-black hover:bg-slate-50" :
        "bg-slate-50 hover:text-white hover:bg-slate-600"
    return <div onClick={() => { if (onClick) onClick(label)} } className={"group select-none inline-block mr-1 mb-1 px-1 text-xs border border-slate-900 rounded-md shadow-sm shadow-slate-300 " + classColors}>
    {label}
    {(children != null) && <div className="hidden absolute group-hover:block bg-slate-600 border-slate-900 rounded-md max-w-xs border mt-1 p-1 shadow-sm text-white">{children}</div>}
</div>
}