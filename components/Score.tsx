import { StarIcon as EmtpyStar} from "@heroicons/react/24/outline"
import { StarIcon as SolidStar } from "@heroicons/react/24/solid"

interface ScoreProps {
    max: number,
    current?: number,
}

export const Score: React.FC<ScoreProps> = ({max, current}) => {
    let stars: JSX.Element[] = [];
    if (current) {
        const total = 5
        const full = Math.floor(current / max * total)
        for (let i = 0; i < full; i++) {
            stars.push(<SolidStar className="inline w-4 h-4 mr-1" key={"star-" + i}/>)
        }
        for (let i = full; i < total; i++) {
            stars.push(<EmtpyStar className="inline w-4 h-4 mr-1" key={"star-" + i}/>)
        }

    }
    return <div>{stars}</div>
}