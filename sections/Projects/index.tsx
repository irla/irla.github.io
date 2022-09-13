import { Pill } from '../../components/Pill'
import { DateRange } from '../../components/DateRange'

interface Project {
    name: string,
    startDate: string,
    endDate: string,
    description: string,
    role: string,
    technologies: string[],
    url?: string,
}

export interface ProjectsProps {
    commercial: Project[],
    hobby: Project[],
    filter: string,
}

export interface YearOfProjects {
    year: string,
    commercial: Project[],
    hobby: Project[],
}

export const groupByYear = (projects: Project[]): Map<number, Project[]> => {
    return projects.reduce<Map<number, Project[]>>(
        (map, project: Project) => {
            const year = (new Date(project.startDate)).getFullYear()
            map.set(year, [...map.get(year) ?? [], project])
            return map
        }, 
        new Map<number, Project[]>()
    )
}

export const Projects: React.FC<ProjectsProps> = ({ commercial, hobby, filter }) => {

    const filterIsBlank = (!filter || filter.trim().length == 0) as boolean
    const highlighted = (skillName: string): boolean => {
        return filter.trim().length > 0 && skillName.toLowerCase().includes(filter.toLowerCase())
    }
    return (
        <div className="p-2">
            <div className='block text-2xl'>Projects</div>
            <div className='flex'>
                <div className='sm:flex-col border-r border-gray-900 border-dashed sm:basis-1/2'>
                    {commercial.map((project: Project) => {
                        return <div key={project.name} className="py-2 mr-3 mb-3.5">
                            <div className="flex flex-row-reverse items-center -mr-2.5">
                                <div className="relative w-3 h-3 bg-gray-200 rounded-full -right-2 border border-gray-900"></div>
                                <div className="relative w-5 border-b border-gray-900 -right-3 border-dashed -z-50"></div>
                                <DateRange from={project.startDate} to={project.endDate} />
                            </div>
                            <span className='block text-xl text-center'>{project.name}</span>
                            <p>{project.description}</p>
                            {project.technologies.map(technology => {
                                return <Pill key={technology} label={technology} highlighted={highlighted(technology)} />
                            })}
                            <a href={project.url}>{project.url}</a>
                        </div>
                    })}
                </div>
                <div className='sm:flex-col sm:basis-1/2'>
                    {hobby.map((project: Project) => {
                        return <div key={project.name} className="py-2 ml-3 mb-3">
                            <div className="flex flex-row items-center -ml-2.5">
                                <div className="relative w-3 h-3 bg-gray-200 rounded-full -left-2 border border-gray-900"></div>
                                <div className="relative w-5 border-b border-gray-900 -left-3 border-dashed -z-50"></div>
                                <DateRange from={project.startDate} to={project.endDate} />
                            </div>
                            <span className='block text-xl text-center'>{project.name}</span>
                            <p>{project.description}</p>
                            {project.technologies.map(technology => {
                                return <Pill key={technology} label={technology} highlighted={highlighted(technology)} />
                            })}
                            <a href={project.url}>{project.url}</a>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}