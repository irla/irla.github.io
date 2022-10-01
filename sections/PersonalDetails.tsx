import { MapIcon, EnvelopeIcon, PhoneIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

interface PersonalDetailsProps {
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({}) => {
    const [phoneNumber, setPhoneNumber] = useState('+48 519 084 2<sup>8</sup>')
    const [mailTo, setMailTo] = useState('')
    useEffect(() => {
        window.setTimeout(() => {
            setPhoneNumber('+48 519 084 256')
            setMailTo('irla.pawel@gmail.com')
        }, 3000)
    }, []);
    return (
        <div id="PersonalDetails" className="flex items-center">
            <img className="flex flex-col mr-3 h-36 rounded-md border-slate-300 border shadow-lg shadow-slate-300 md:mr-5" src="pawel_irla_pic.jpg" />
            <div className="flex flex-col">
                <strong className="text-3xl">Paweł Irla</strong>
                <span className="text-2xl">Full&nbsp;Stack&nbsp;Developer</span>
                <span className='text-lg'>{new Date().getFullYear() - 2007} years of experience</span>
                <div className='flex flex-wrap gap-x-3'>
                    <a href='https://www.google.pl/maps/place/Zielona+G%C3%B3ra'><span className="flex items-center"><MapIcon className="inline-block h-5 w-5 mr-1" />Zielona Góra | Poland</span></a>
                    <a href={'mailto:' + mailTo}><span className="flex items-center"><EnvelopeIcon className="inline-block h-5 w-5 mr-1" />irla.pawel@gmail.com</span></a>
                    <a href={'tel:' + phoneNumber}><span className="flex items-center"><PhoneIcon className="inline-block h-5 w-5 mr-1" /><div dangerouslySetInnerHTML={{__html:phoneNumber}}/></span></a>
                    <a href='Paweł Irla - CV.pdf' className='print:hidden'>
                        <span className="flex items-center">
                            <DocumentIcon className="inline-block h-5 w-5 mr-1" />
                            Get PDF verion of this CV
                        </span>
                    </a>
                    <a href='https://irla.github.io' className='hidden print:block'>
                        Go to interactive CV version at: <span className='text-blue-500'>irla.github.io</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails