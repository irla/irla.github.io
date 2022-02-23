import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Navbar } from '../sections/Navbar'
import PersonalDetails from '../sections/PersonalDetails'
import About from '../sections/About'
import { Experience, ExperienceProps } from '../sections/Experience'
import { Skills, SkillsProps } from '../sections/Skills'
import fetch from 'cross-fetch'
import { useState } from 'react'

interface Props {
  experience: ExperienceProps,
  skills: SkillsProps,
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // I know, I know. I could just import these jsons, but I really
  // wanted to checkout api and dynamic routing functionality
  let res = await fetch('http://localhost:3000/api/data/experience')
  const experience = await res.json() as ExperienceProps

  res = await fetch('http://localhost:3000/api/data/skills')
  const skills = await res.json() as SkillsProps


  return {
      props: {
          experience, skills
      },
  }
}

const Home: NextPage<Props> = ({experience, skills}: Props) => {
  const [filter, setFilter] = useState('')
  const filterIsBlank = (!filter || filter.trim().length == 0) as boolean
  const hideClass = filterIsBlank ? '' : 'hidden'

  return (
    <div>
      <Head>
        <title>Paweł Irla - CV</title>
        <meta name="description" content="CV page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Navbar onFilterUpdate={(value) => {setFilter(value)}}/>
      </header>

      <main className='px-2 sm:px-10 max-w-7xl mx-auto'>
        <div className={filterIsBlank ? 'sm:flex' : 'hidden'}>
          <div className="px-2 sm:px-6 lg:px-8 md:px-1">
            <PersonalDetails />
          </div>
          <div className="px-2 sm:px-6 lg:px-8 md:px-1 lg:basis-2/3 sm:basis-2/4">
            <About />
          </div>
        </div>
        <div className='sm:flex'>
          <div className={(filterIsBlank ? '' : "hidden ") + "px-2 sm:px-6 lg:px-8 md:px-2 lg:basis-2/3"}>
            <Experience work={experience.work} education={experience.education} />
          </div>
          <div className="px-2 sm:px-6 lg:px-8 md:px-2 lg:basis-1/3 sm:basis-1/3">
            <Skills skills={skills.skills} languages={skills.languages} interests={skills.interests} filter={filter}/>
          </div>
        </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
