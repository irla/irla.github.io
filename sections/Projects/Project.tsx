import { Pill } from '../../components/Pill'
import { DateRange } from '../../components/DateRange'
import { Project as ProjectData, ProjectType, filterMatches } from './index'

export interface ProjectProps {
    project?: ProjectData,
    type: ProjectType,
    filter: string,
}

export const Project: React.FC<ProjectProps> = ({project, type, filter}) => {
    if (project) {

        const highlighted = (skillName: string): boolean => {
            return filterMatches(filter, skillName)
        }

        const pointer = type == ProjectType.HOBBY 
            ? <div className='relative rotate-45 w-3 h-3 border-l border-b z-50 bg-slate-100 -left-1'></div>
            : <div className='relative rotate-45 w-3 h-3 border-r border-t z-50 bg-slate-100 -right-1'></div>

        return (
        <div className="border rounded-md m-2 flex flex-wrap">
            <div className='basis-full bg-slate-100 flex items-center'>
                {pointer}
                <DateRange from={project.startDate} to={project.endDate} />
                <span className='ml-auto'>{project.name}</span>
            </div>
            <div className='basis-full px-2 my-2'>{project.description}</div>
            <div className='basis-full px-2 mb-2'>
            {project.technologies.map(technology => {
                                return <Pill key={technology} label={technology} highlighted={highlighted(technology)} />
                            })}
            </div>
        </div>
        )
    }
    return <div />
}