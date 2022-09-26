import { groupSortAndFilter, SortDir } from '@/sections/Projects'
import projects from '@/pages/api/data/projects.json'


describe('grouping function', () => {
    const projectProps = { hobby: projects.hobby, commercial: projects.commercial }
    const years = [2006, 2007, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]

    it('should group by year', () => {
        const grouped = groupSortAndFilter(projectProps)

        expect(grouped.size).toBe(11)
    })

    it('should sort years ascending', () => {
        const grouped = groupSortAndFilter(projectProps, SortDir.ASC)
        expect([... grouped.keys()]).toEqual(years)
    })

    it('should sort years descending', () => {
        const grouped = groupSortAndFilter(projectProps, SortDir.DESC)
        expect([... grouped.keys()]).toEqual(years.reverse())
    })

    it('should sort months ascending', () => {
        const grouped = groupSortAndFilter(projectProps, SortDir.ASC)
        expect([... grouped.get(2016).months.keys()]).toEqual([0, 1, 3, 6, 9])
        expect([... grouped.get(2013).months.keys()]).toEqual([1, 4, 8, 9, 10])
    })

    it('should sort months descending', () => {
        const grouped = groupSortAndFilter(projectProps, SortDir.DESC)
        expect([... grouped.get(2016).months.keys()]).toEqual([9, 6, 3, 1, 0])
        expect([... grouped.get(2013).months.keys()]).toEqual([10, 9, 8, 4, 1])
    })

    it('should group months correctly', () => {
        const grouped = groupSortAndFilter(projectProps, SortDir.ASC)

        const feb2016 = grouped.get(2016).months.get(1)
        expect(feb2016.hobby.name).toBe('loteria.parago.pl')
        expect(feb2016.commercial.name).toBe('jaxrs-client-proxy')

        const jan2016 = grouped.get(2016).months.get(0)
        expect(jan2016.hobby).toBeUndefined()
        expect(jan2016.commercial.name).toBe('Precision AG Microservices')
    })

    it('should filter by matching skill', () => {
        var props = {filter: 'Spock', ... projectProps}
        const grouped = groupSortAndFilter(props, SortDir.ASC)

        expect([... grouped.keys()]).toEqual([2016])
        expect([... grouped.get(2016).months.keys()]).toEqual([0, 1, 9])

    })
})