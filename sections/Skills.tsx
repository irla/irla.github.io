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
    interests: string[]
}

export const Skills: React.FC<SkillsProps> = (props) => {
    const {skills, languages, interests} = props
    return (
        <div>
            <div className="p-2 mb-3">
                <div className='block text-2xl'>Siklls</div>
                {skills.map((skillGroupItem: SkillGroup) => {
                    return <div key={skillGroupItem.name} className="py-2">
                        <div className='block text-xl'>{skillGroupItem.name}</div>
                        <div>
                        {skillGroupItem.items.map(( skillItem: Skill) => {
                            return <div className="group select-none inline-block mr-1 mb-1 px-1 text-xs border border-slate-900 rounded-md bg-slate-50 shadow-sm shadow-slate-300 hover:text-white hover:bg-slate-600">
                                {skillItem.name}
                                <div className="hidden absolute group-hover:block bg-slate-600 border-slate-900 rounded-md max-w-xs border mt-1 p-1 shadow-sm">{skillItem.info}</div>
                            </div>
                        })}
                        </div>
                    </div>
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