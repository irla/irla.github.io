import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import PersonalDetails from '../components/PersonalDetails'
import About from '../components/About'
import { Experience, ExperienceProps } from '../components/Experience'
import { Skills, SkillsProps } from '../components/Skills'
import fetch from 'cross-fetch'

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
  return (
    <div>
      <Head>
        <title>Paweł Irla - CV</title>
        <meta name="description" content="CV page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Navbar />
      </header>

      <main className='px-2 sm:px-10 max-w-7xl mx-auto'>
        <div className="sm:flex">
          <PersonalDetails />
          <About />
        </div>
        <div className='sm:flex'>
          <Experience work={experience.work} education={experience.education} />
          <Skills skills={skills.skills} languages={skills.languages} interests={skills.interests}/>
        </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
