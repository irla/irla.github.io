import { DateRange } from '../components/DateRange'

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

export const Experience: React.FC<ExperienceProps> = ({work, education}) => {
    return (
        <div>
            <div className="p-2 mb-3">
                <div className='block text-2xl'>Education</div>
                {education.map((educationItem: Education) => {
                    return <div key={educationItem.institution} className="py-2">
                        <div className='block text-xl'>{educationItem.institution}</div>
                        <DateRange from={educationItem.startDate} to={educationItem.endDate} size="sm" />
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
                        <DateRange from={workItem.startDate} to={workItem.endDate} size="sm"/>
                        <strong>{workItem.position}</strong>
                        <div className="block">{workItem.summary}</div>
                    </div>
                })}
            </div>
        </div>
    )
}