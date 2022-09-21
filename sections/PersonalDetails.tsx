import { MapIcon, EnvelopeIcon as MailIcon, PhoneIcon } from '@heroicons/react/24/outline'

interface PersonalDetailsProps {
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({}) => {
    return (
        <div className="flex items-center">
            <img className="flex flex-col mr-3 w-36 h-36 rounded-md border-slate-300 border shadow-lg shadow-slate-300 md:mr-5" src="pawel_irla_pic.jpg" />
            <div className="flex flex-col">
                <strong className="text-2xl">Paweł Irla</strong>
                <span className="text-xl">Full&nbsp;Stack&nbsp;Developer</span>
                <span>&gt; 14 years of experience</span>
                <span className="flex items-center"><MapIcon className="inline-block h-5 w-5 mr-1" />Zielona Góra | Poland</span>
                <span className="flex items-center"><MailIcon className="inline-block h-5 w-5 mr-1" /><a href="">irla.pawel@gmail.com</a></span>
                <span className="flex items-center"><PhoneIcon className="inline-block h-5 w-5 mr-1" />+48 519 084 256</span>
            </div>
        </div>
    )
}

export default PersonalDetails