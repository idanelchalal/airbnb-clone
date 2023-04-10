import Container from '../Container'

import CategoryBox from '../CategoryBox'

export const categories = [
    {
        label: 'Beach',
        iconName: 'TbBeach',
        description: 'This property is close to the beach!',
    },
    {
        label: 'Modern',
        iconName: 'MdOutlineVilla',
        description: 'This property has windmills!',
    },
    {
        label: 'Windmills',
        iconName: 'GiWindmill',
        description: 'This property has windmills!',
    },
    {
        label: 'Countryside',
        iconName: 'TbMountain',
        description: 'This property is in the countryside!',
    },
    {
        label: 'Pools',
        iconName: 'TbPool',
        description: 'This property has a pool!',
    },
    {
        label: 'Islands',
        iconName: 'GiIsland',
        description: 'This property is on an island!',
    },
    {
        label: 'Lake',
        iconName: 'GiBoatFishing',
        description: 'This property is close to a lake!',
    },
    {
        label: 'Skiing',
        iconName: 'FaSkiing',
        description: 'This property has skiing activities!',
    },
    {
        label: 'Castles',
        iconName: 'GiCastle',
        description: 'This property is in a castle',
    },
    {
        label: 'Camping',
        iconName: 'GiForestCamp',
        description: 'This property has camping activties!',
    },
    {
        label: 'Arctic',
        iconName: 'BsSnow',
        description: 'This property has camping',
    },
    {
        label: 'Cave',
        iconName: 'GiCaveEntrance',
        description: 'This property is in a cave!',
    },
    {
        label: 'Desert',
        iconName: 'GiCactus',
        description: 'This property is in the desert!',
    },
    {
        label: 'Barns',
        iconName: 'GiBarn',
        description: 'This property is in the barn!',
    },
    {
        label: 'Lux',
        iconName: 'IoDiamond',
        description: 'This property is luxurious!',
    },
]
const Categories = () => {
    return (
        <Container>
            <div
                className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        "
            >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        description={item.description}
                        iconName={item.iconName}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories
