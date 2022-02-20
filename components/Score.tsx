import { StarIcon as EmtpyStar} from '@heroicons/react/outline'
import { StarIcon as SolidStar } from '@heroicons/react/solid'

interface ScoreProps {
    max: number,
    current?: number,
}

export const Score: React.FC<ScoreProps> = ({max, current}) => {
    let stars: JSX.Element[] = [];
    if (current) {
        for (let i = 0; i < current; i++) {
            stars.push(<SolidStar className="inline w-4 h-4 mr-1" key={'star-' + i}/>)
        }
        for (let i = current; i < max; i++) {
            stars.push(<EmtpyStar className="inline w-4 h-4 mr-1" key={'star-' + i}/>)
        }

    }
    return <div>{stars}</div>
}