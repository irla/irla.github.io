import { isNotBlank, filterMatches } from "../../lib/filter"

describe("not blank", () => {

    it("should known when filter is not blank", () => {
        expect(isNotBlank(undefined)).toBeFalsy()
        expect(isNotBlank("")).toBeFalsy()
        expect(isNotBlank(" ")).toBeFalsy()
        expect(isNotBlank("     ")).toBeFalsy()
        
        expect(isNotBlank("some filter")).toBeTruthy()
    })

})

describe("matching is advanced", () => {

    it("should ignore case", () => {
        expect(filterMatches("SPO", "spock")).toBeTruthy()
    })

    it("should match things by type", () => {
        expect(filterMatches("rmq", "RabbitMQ")).toBeTruthy()
        expect(filterMatches("amq", "ActiveMQ")).toBeTruthy()
        expect(filterMatches("jms", "RabbitMQ")).toBeTruthy()
        expect(filterMatches("JMS", "ActiveMQ")).toBeTruthy()
        expect(filterMatches("SQL", "db2")).toBeTruthy()
    })

    it("java is not javascript", () => {
        expect(filterMatches("java", "javascript")).toBeFalsy()
    })
})