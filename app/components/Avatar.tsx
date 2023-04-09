'use client'
import Image from 'next/image'
interface AvatarProps {
    imageSrc: string | null | undefined
}
const Avatar: React.FC<AvatarProps> = ({ imageSrc }) => {
    return (
        <Image
            src={imageSrc || '/images/placeholder.jpg'}
            alt="User Avatar"
            width="30"
            height="30"
            className="rounded-full
    "
            priority={false}
        />
    )
}

export default Avatar
