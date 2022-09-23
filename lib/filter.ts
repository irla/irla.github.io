
export const isNotBlank = (filter?: String): boolean => {
    return filter !== undefined && filter.trim().length > 0
}

export const filterMatches = (filter: string, skillName: string): boolean => {
    return isNotBlank(filter) && skillName.toLowerCase().includes(filter.toLowerCase())
}