import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Navbar } from '../sections/Navbar'
import PersonalDetails from '../sections/PersonalDetails'
import About from '../sections/About'
import { Experience, ExperienceProps } from '../sections/Experience'
import { Skills, SkillsProps } from '../sections/Skills'
import { Projects, ProjectsProps } from '../sections/Projects'
import { useState } from 'react'
import experience from './api/data/experience.json'
import skills from './api/data/skills.json'
import projects from './api/data/projects.json'

export interface Props {
  experience: ExperienceProps,
  skills: SkillsProps,
  projects: ProjectsProps,
}

export const getStaticProps: GetStaticProps<Props> = () => {
  return { 
    props: { 
      experience: experience as ExperienceProps, 
      skills: skills as SkillsProps,
      projects: projects as ProjectsProps,
    }
  }
}


const navigation = [
  { name: 'About', href: '#PersonalDetails' },
  { name: 'Experience', href: '#Experience' },
  { name: 'Education', href: '#Education' },
  { name: 'Projects', href: '#Projects' },
]


const Home: NextPage<Props> = ({experience, skills, projects}: Props) => {
  const [filter, setFilter] = useState('')
  const filterIsBlank = (!filter || filter.trim().length == 0) as boolean

  return (
    <div>
      <Head>
        <title>Paweł Irla - CV</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="CV page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="print:hidden">
        <Navbar onFilterUpdate={(value) => {setFilter(value)}} filterValue={filter} navigation={navigation} />
      </header>
      <main className='print:px-0 px-1 max-w-6xl mx-auto'>
        <div className={'py-2 ' + (filterIsBlank ? 'sm:flex' : 'hidden')}>
          <div>
            <PersonalDetails />
          </div>
          <div className="lg:basis-2/3 sm:basis-1/3">
            <About />
          </div>
        </div>
        <div className="sm:flex sm:flex-wrap">
          <div className={(filterIsBlank ? '' : "hidden ") + "pr-2 sm:pr-4 lg:pr-8 md:pr-6 sm:basis-2/3"}>
            <Experience work={experience.work} education={experience.education} />
          </div>
          <div className="lg:basis-1/3 sm:basis-1/3 ">
            <Skills skills={skills.skills} languages={skills.languages} interests={skills.interests} filter={filter} filterSetter={(value) => setFilter(value)}/>
          </div>
          <div id="projects" className={(filterIsBlank ? 'sm:basis-full' : "-order-1 sm:basis-2/3")}>
            <Projects commercial={projects.commercial} hobby={projects.hobby} filter={filter} />
          </div>
        </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
