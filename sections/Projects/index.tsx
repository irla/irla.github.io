import { Project } from './Project'
import { filterMatches } from '../../lib/filter'

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
    const direction = sortDir == SortDir.ASC ? 1 : -1
    return new Map([... map].sort((a, b) => (a[0] - b[0]) * direction))
}

export const Projects: React.FC<ProjectsProps> = (props) => {

    const grouped = groupSortAndFilter(props)
    const filtered = props.filter.trim().length > 0

    return (
        <div id="Projects" className={filtered ? "sm:mr-2" : ""}>
            <div className='block text-2xl'>Projects</div>
            {[... grouped].map(([year, yearOfProjects]) => {
                return <div key={year} className='flex flex-wrap'>
                        <div className='basis-full flex items-center my-2'><span className='m-auto'>{year}</span></div>
                        {[... yearOfProjects.months].map(([month, projects]) => {
                            return <div className="basis-full flex flex-wrap sm:flex-nowrap">
                                <div className='flex-row basis-full sm:flex-col sm:basis-1/2 sm:border-r sm:border-dashed sm:border-gray-900 sm:dark:border-gray-400'>
                                    <Project project={projects.commercial} left={true} filter={props.filter}/>
                                </div>
                                <div className='flex-row basis-full sm:flex-col sm:basis-1/2'>
                                    <Project project={projects.hobby} left={false} filter={props.filter}/>
                                </div>
                            </div>
                        })}
                    </div>
            })}
        </div>
    )
}