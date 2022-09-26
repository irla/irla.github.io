import { render, screen } from '@testing-library/react'
import { DateRange } from '@/components/DateRange'

describe('Dates are formatted correctly', () => {

    it('renders formated date when both are provided', () => {
        const { baseElement } = render(<DateRange from='2012-01-01' to='2022-12-13' />)


        expect(baseElement.textContent).toContain('January 2012 - December 2022')
    })

    it('renders what it gets if the date is in wrong format', () => {
        const { baseElement } = render(<DateRange from='2015-05-13' to='Now' />)


        expect(baseElement.textContent).toContain('May 2015 - Now')
    })
})