import { Pill } from '../components/Pill'
import { Score } from '../components/Score'

interface Skill {
    name: string,
    score?: number,
    smiles?: number,
    info: string,
}

interface SkillGroup {
    name: string,
    items: Skill[],
}

interface Language {
    name: string,
    level: string,
    score: number,
}

export interface SkillsProps {
    skills: SkillGroup[],
    languages: Language[],
    interests: string[],
    filter: string,
}

export const Skills: React.FC<SkillsProps> = ({skills, languages, interests, filter}) => {
    const highlighted = (skillName: string): boolean => {
        return filter.trim().length > 0 && skillName.toLowerCase().includes(filter.toLowerCase())
    }
    return (
        <div>
            <div className="p-2 mb-3">
                <div className='block text-2xl'>Siklls</div>
                {skills.map((skillGroupItem: SkillGroup) => {
                    return <div key={skillGroupItem.name} className="py-2">
                        <div className='block text-xl'>{skillGroupItem.name}</div>
                        <div>
                        {skillGroupItem.items.map(( skillItem: Skill) => {
                            return <Pill label={skillItem.name} key={skillItem.name} highlighted={highlighted(skillItem.name)}>
                                <Score max={10} current={skillItem.score} />
                                <div className="p-1 text-sm">{skillItem.info}</div>
                            </Pill>
                        })}
                        </div>
                    </div>
                })}
            </div>
            <div className="p-2 mb-3">
                <div className='block text-2xl'>Interests</div>
                {interests.map((interestItem: string) => {
                    return <Pill key={interestItem} label={interestItem} highlighted={false} />
                })}
            </div>
            <div className="p-2 mb-3">
                <div className='block text-2xl'>Languages</div>
                {languages.map((languageItem: Language) => {
                    return <div key={languageItem.name} className="py-2">
                        <div className='block text-xl'>{languageItem.name} - {languageItem.level}</div>
                    </div>
                })}
            </div>
        </div>
    )
}