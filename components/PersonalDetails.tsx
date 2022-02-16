import { MapIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline'

export default function PersonalDetails(){
    return (
        <div className="px-2 sm:px-6 lg:px-8 md:px-2">
            <div className="relative flex items-center p-2">
                <img className="flex flex-col mr-3 w-36 h-36 rounded-md border-slate-300 border shadow-lg shadow-slate-300 md:mr-5" src="pawel_irla_pic.jpg" />
                <div className="flex flex-col">
                    <strong className="text-2xl">Paweł Irla</strong>
                    <span className="text-xl">Full&nbsp;Stack&nbsp;Developer</span>
                    <span>&gt; 14 years of experience</span>
                    <span className="flex items-center"><MapIcon className="inline-block h-5 w-5 mr-1"/>Zielona Góra | Poland</span>
                    <span className="flex items-center"><MailIcon className="inline-block h-5 w-5 mr-1"/><a href="">irla.pawel@gmail.com</a></span>
                    <span className="flex items-center"><PhoneIcon className="inline-block h-5 w-5 mr-1"/>+48 519 084 256</span>
                </div>
            </div>
        </div>
    )
}