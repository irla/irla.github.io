import fetch from 'cross-fetch'
import { Props } from '../pages'
import { ExperienceProps } from '../sections/Experience'
import { SkillsProps } from '../sections/Skills'
import { ProjectsProps } from '../sections/Projects'

// TODO data should have own types no components props

export const callAllApis = async (): Promise<Props> => {
    // I know, I know. I could just import these jsons, but I really
    // wanted to checkout api and dynamic routing functionality
  let res = await fetch('http://localhost:3000/api/data/experience')
  const experience = await res.json() as ExperienceProps

  res = await fetch('http://localhost:3000/api/data/skills')
  const skills = await res.json() as SkillsProps

  res = await fetch('http://localhost:3000/api/data/projects')
  const projects = await res.json() as ProjectsProps


  return {
          experience, skills, projects
      }
} 