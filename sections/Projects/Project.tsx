import { Pill } from '../../components/Pill'
import { DateRange } from '../../components/DateRange'
import { Project as ProjectData, ProjectType, filterMatches } from './index'

export interface ProjectProps {
    project?: ProjectData,
    left: boolean,
    filter: string,
}

export const Project: React.FC<ProjectProps> = ({project, left, filter}) => {
    if (project) {

        const highlighted = (skillName: string): boolean => {
            return filterMatches(filter, skillName)
        }

        const pointer = left 
            ? <div className='relative rotate-45 w-2 h-2 border-r border-t z-50 bg-slate-100 -right-1'></div>
            : <div className='relative rotate-45 w-2 h-2 border-l border-b z-50 bg-slate-100 -left-1'></div>

        return (
        <div className={'border rounded-md flex flex-wrap my-2 ' + (left ? 'mr-2' : 'ml-2')} >
            <div className={'basis-full bg-slate-100 flex items-center py-1 ' + (left ? 'text-right' : ' flex-row-reverse')}>
                <div className='basis-full'>
                    <span className={left ? 'mr-auto text-left pl-2' : 'ml-auto text-right pr-2'}>{project.name}</span>
                    <DateRange from={project.startDate} to={project.endDate} size='xs'/>
                </div>
                {pointer}
            </div>
            <div className='basis-full px-1 my-1 sm:px-2 sm:my-2'>{project.description}</div>
            <div className='basis-full px-1 mb-1 sm:px-2 sm:mb-2'>
            {project.technologies.map(technology => {
                                return <Pill key={technology} label={technology} highlighted={highlighted(technology)} />
                            })}
            </div>
        </div>
        )
    }
    return <div />
}