import { Pill } from '../../components/Pill'
import { DateRange } from '../../components/DateRange'
import { Project } from './Project'

export interface Project {
    name: string,
    startDate: string,
    endDate: string,
    description: string,
    role: string,
    technologies: string[],
    url?: string,
}

export interface ProjectsProps {
    commercial: Array<Project>,
    hobby: Array<Project>,
    filter: string,
}

export enum SortDir {
    ASC,
    DESC,
}

export enum ProjectType {
    COMMERCIAL = "commercial",
    HOBBY = "hobby",
}

 interface YearOfProjects {
    months: Map<number, MonthOfProjects>,
}

export interface MonthOfProjects extends Partial<Record<ProjectType, Project>> { }

export const groupSortAndFilter = (projects: ProjectsProps, sortDir: SortDir = SortDir.DESC): Map<number, YearOfProjects> => {
    let years = new Map<number, YearOfProjects>()
    let filter = projects.filter
    let commercial = projects.commercial
    let hobby = projects.hobby
    if (filter && filter.trim().length > 0) {
        commercial = commercial.filter(project => project.technologies.some(skill => filterMatches(filter, skill)))
        hobby = hobby.filter(project => project.technologies.some(skill => filterMatches(filter, skill)))
    }
    commercial.forEach(project => addProjectToYears(years, project, ProjectType.COMMERCIAL))
    hobby.forEach(project => addProjectToYears(years, project, ProjectType.HOBBY))
    return sortYears(years, sortDir)
}

const addProjectToYears = (years: Map<number, YearOfProjects>, project: Project, type: ProjectType) => {
    let year = new Date(project.startDate).getFullYear()
    let yearOfProjects = years.get(year)
    if (!yearOfProjects) {
        yearOfProjects = { months: new Map()}
        years.set(year, yearOfProjects)
    }
    addProjectToMonth(yearOfProjects.months, project, type)
}

const addProjectToMonth = (months: Map<number, MonthOfProjects>, project: Project, type: ProjectType) => {
    let month = new Date(project.startDate).getMonth()
    let monthOfProjects = months.get(month)
    if (!monthOfProjects) {
        monthOfProjects = { }
        months.set(month, monthOfProjects)
    }

    if (monthOfProjects[type]) {
        throw new Error(`${type} type already set with ${monthOfProjects[type]!.name}, can not add ${project.name}`)
    }

    monthOfProjects[type] = project
}

const sortYears = (years: Map<number, YearOfProjects>, sortDir: SortDir): Map<number, YearOfProjects> => { 
    years.forEach(value => value.months = sort(value.months, sortDir))
    return sort(years, sortDir)
}

const sort = <Type,>(map: Map<number, Type>, sortDir: SortDir): Map<number, Type> => {
    let entries = [... map].sort()
    if (sortDir == SortDir.DESC) {
        entries = entries.reverse()
    }
    return new Map(entries)
}

export const filterMatches = (filter: string, skillName: string): boolean => {
    return filter != undefined && filter.trim().length > 0 && skillName.toLowerCase().includes(filter.toLowerCase())
}

export const Projects: React.FC<ProjectsProps> = (props) => {

    const grouped = groupSortAndFilter(props)

    return (
        <div className="p-2">
            <div className='block text-2xl'>Projects</div>
                {[... grouped].map(([year, yearOfProjects]) => {
                    return <div className='flex flex-wrap'>
                            <div className='basis-full flex items-center my-2'><span className='m-auto'>{year}</span></div>
                            {[... yearOfProjects.months].map(([month, projects]) => {
                                return <div className="basis-full flex">
                                    <div className='flex-col basis-1/2 border-r border-dashed border-gray-900'>
                                        <Project project={projects.commercial} left={true} filter={props.filter}/>
                                    </div>
                                    <div className='flex-col basis-1/2'>
                                        <Project project={projects.hobby} left={false} filter={props.filter}/>
                                    </div>
                                </div>
                            })}
                        </div>
                })}
                {/* <div className='sm:flex-col border-r border-gray-900 border-dashed sm:basis-1/2'>
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
                </div> */}
        </div>
    )
}