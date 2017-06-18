export type SkillDataType = {
  name: string,
  details: {
    [string]: {
      score?: number,
      smiles?: number,
      info: string
    }
  }
}

export type WorkDataType = {
  company: string,
  position: string,
  website: string,
  startDate: string,
  endDate: string,
  summary: string
}

export type EducationDataType = {
  institution: string,
  area: string,
  studyType: string,
  startDate: string,
  endDate: string,
  summary: string[]
}

export type ProjectDataType = {
  name: string,
  startDate: string,
  endDate: string,
  description: string,
  role?: string,
  technologies: string[],
  url?: string
}

export type LanguageDataType = {
  name: string,
  level: string,
  score: number
}

export type InterestDataType = {
  name: string,
  keywords: string[]
}
