import { MapIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { type } from 'os'

interface DateRange {
    startDate: string,
    endDate: string,
}

interface Work {
    company: string,
    position: string,
    website: string,
    startDate: string,
    endDate: string,
    summary: string,
}

interface Education {
    institution: string,
    area: string,
    studyType: string,
    startDate: string,
    endDate: string,
    summary: string[],
}

export interface ExperienceProps {
    education: Education[],
    work: Work[],
}

const formatDateRange = (dateRange: DateRange): string => {
    const from = new Date(dateRange.startDate)
    const to = new Date(dateRange.endDate)
    const fromStr = isNaN(from.getTime()) ? dateRange.startDate : from.toLocaleString('en', { month: 'long', year: 'numeric'})
    const toStr = isNaN(to.getTime()) ? dateRange.endDate : to.toLocaleString('en', { month: 'long', year: 'numeric'})
    return `${fromStr} - ${toStr}`
}

export const Experience: React.FC<ExperienceProps> = ({work, education}) => {
    return (
        <div>
            <div className="p-2 mb-3">
                <div className='block text-2xl'>Education</div>
                {education.map((educationItem: Education) => {
                    return <div key={educationItem.institution} className="py-2">
                        <div className='block text-xl'>{educationItem.institution}</div>
                        <div className='block'>{formatDateRange(educationItem)}</div>
                        <strong>{educationItem.studyType} - {educationItem.area}</strong>
                        {educationItem.summary.map((summaryLine: string) => {
                            return <div className="block" key={summaryLine}>{summaryLine}</div>
                        })}
                    </div>
                })}
            </div>
            <div className="p-2 mb-3">
                <div className='block text-2xl'>Experience</div>
                {work.map((workItem: Work) => {
                    return <div key={workItem.company} className="py-2">
                        <div className='block text-xl'>{workItem.company}</div>
                        <div className='block'>{formatDateRange(workItem)}</div>
                        <strong>{workItem.position}</strong>
                        <div className="block">{workItem.summary}</div>
                    </div>
                })}
            </div>
        </div>
    )
}