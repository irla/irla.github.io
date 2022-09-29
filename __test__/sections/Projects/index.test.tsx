import { groupSortAndFilter, SortDir } from '@/sections/Projects'
import projects from '@/pages/api/data/projects.json'


describe('grouping function', () => {
    const projectProps = { hobby: projects.hobby, commercial: projects.commercial }
    const years = [2007, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2022]

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
        expect([... grouped.get(2016).months.keys()]).toEqual([1, 9, 10])
        expect([... grouped.get(2013).months.keys()]).toEqual([3, 4, 7])
    })

    it('should sort months descending', () => {
        const grouped = groupSortAndFilter(projectProps, SortDir.DESC)
        expect([... grouped.get(2016).months.keys()]).toEqual([10, 9, 1])
        expect([... grouped.get(2013).months.keys()]).toEqual([7, 4, 3])
    })

    it('should group months correctly', () => {
        const grouped = groupSortAndFilter(projectProps, SortDir.ASC)

        const feb2016 = grouped.get(2016).months.get(1)
        expect(feb2016.hobby.name).toBe('parago.pl')
        expect(feb2016.commercial).toBeUndefined()

        const now = grouped.get(2022).months.get(12)
        expect(now.hobby.name).toBe('This CV page')
        expect(now.commercial.name).toBe('casumo.com')
    })

    it('should filter by matching skill', () => {
        var props = {filter: 'Spock', ... projectProps}
        const grouped = groupSortAndFilter(props, SortDir.ASC)

        expect([... grouped.keys()]).toEqual([2016, 2017, 2022])
        expect([... grouped.get(2016).months.keys()]).toEqual([9, 10])

    })
})