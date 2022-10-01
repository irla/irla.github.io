
export const isNotBlank = (filter?: String): boolean => {
    return filter !== undefined && filter.trim().length > 0
}

const equivalents: Map<string, Array<string>> = new Map([
    ['jms', ['rabbitmq', 'activemq']],
    ['rmq', ['rabbitmq']],
    ['amq', ['activemq']],
    ['cloud', ['aws', 'gcp']],
    ['event', ['axon']],
    ['sql', ['db2']],
    ['jvm', ['java', 'groovy', 'kotlin']]
])

const contains = (filter: string, skillName: string): boolean => {
    return skillName.toLowerCase().includes(filter.toLowerCase())
}

const containsEquivalent = (filter: string, skillName: string) => {
    const options = equivalents.get(filter.toLowerCase())
    if (options) {
        return options.find((option: string) => contains(option, skillName)) !== undefined
    }
    return false
}

const javaAndJavaScript = (filter: string, skillName: string): boolean => {
    return filter.toLowerCase() === 'java' && skillName.toLowerCase() === 'javascript'
}

export const filterMatches = (filter: string, skillName: string): boolean => {
    return isNotBlank(filter) && !javaAndJavaScript(filter, skillName) && (
        contains(filter, skillName) ||
        containsEquivalent(filter, skillName)
    )
}