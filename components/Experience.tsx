import { MapIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { type } from 'os'

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

export const Experience: React.FC<ExperienceProps> = (props) => {
    const {work, education} = props
    return (
        <div className="px-2 sm:px-6 lg:px-8 md:px-2">
            <div className="p-2 mb-3">
                <div className='block text-2xl'>Education</div>
                {education.map((educationItem: Education) => {
                    return <div key={educationItem.institution} className="py-2">
                        <div className='block text-xl'>{educationItem.institution}</div>
                        <div className='block'>{educationItem.startDate} - {educationItem.endDate}</div>
                        <strong>{educationItem.studyType} - {educationItem.area}</strong>
                        {educationItem.summary.map((summaryLine: string) => {
                            return <div className="block">{summaryLine}</div>
                        })}
                    </div>
                })}
            </div>
            <div className="p-2 mb-3">
                <div className='block text-2xl'>Experience</div>
                {work.map((workItem: Work) => {
                    return <div key={workItem.company} className="py-2">
                        <div className='block text-xl'>{workItem.company}</div>
                        <div className='block'>{workItem.startDate} - {workItem.endDate}</div>
                        <strong>{workItem.position}</strong>
                        <div className="block">{workItem.summary}</div>
                    </div>
                })}
            </div>
        </div>
    )
}