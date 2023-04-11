'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import qs from 'query-string'
import { IconType } from 'react-icons'
interface CategoryBoxProps {
    description: string
    icon: IconType
    label: string
    selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    description,
    icon: Icon,
    label,
    selected,
}) => {
    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        let currentQuery = {}
        if (params) currentQuery = qs.parse(params.toString())

        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        }

        if (params?.get('category') === label) delete updatedQuery.category

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true }
        )

        router.push(url)
    }, [label, params, router])
    return (
        <div
            onClick={handleClick}
            className={`p-3
    border-b-2
    hover:text-neutral-800
    transition
    cursor-pointer
    flex
    flex-col
    items-center
    justify-center
    gap-2
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}
        >
            {/* {iconName === 'TbBeach' && <TbBeach size={26} />}
            {iconName === 'MdOutlineVilla' && <MdOutlineVilla size={26} />}
            {iconName === 'GiWindmill' && <GiWindmill size={26} />}
            {iconName === 'GiForestCamp' && <GiForestCamp size={26} />}
            {iconName === 'GiIsland' && <GiIsland size={26} />}
            {iconName === 'GiBoatFishing' && <GiBoatFishing size={26} />}
            {iconName === 'GiCaveEntrance' && <GiCaveEntrance size={26} />}
            {iconName === 'GiCactus' && <GiCactus size={26} />}
            {iconName === 'GiBarn' && <GiBarn size={26} />}
            {iconName === 'BsSnow' && <BsSnow size={26} />}
            {iconName === 'GiCastle' && <GiCastle size={26} />}
            {iconName === 'TbMountain' && <TbMountain size={26} />}
            {iconName === 'TbPool' && <TbPool size={26} />}
            {iconName === 'IoDiamond' && <IoDiamond size={26} />}
            {iconName === 'FaSkiing' && <FaSkiing size={26} />} */}
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    )
}

export default CategoryBox
