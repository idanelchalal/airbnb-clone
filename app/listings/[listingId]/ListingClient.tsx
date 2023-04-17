'use client'

import Container from '@/app/components/Container'
import { categories } from '@/app/components/navbar/Categories'
import { SafeListing, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import { useMemo } from 'react'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingHead from '../../components/listings/ListingHead'

interface ListingClientProps {
    reservation?: Reservation[]
    listing: SafeListing & { user: SafeUser }
    currentUser?: SafeUser | null
}
const ListingClient: React.FC<ListingClientProps> = ({
    reservation,
    listing,
    currentUser,
}) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])

    return (
        <>
            <Container>
                <div className="max-w-screen-lg mx-auto mt-[15vh]">
                    <div className="flex flex-col gap-6">
                        <ListingHead
                            title={listing.title}
                            imageSrc={listing.imageSrc}
                            locationValue={listing.locationValue}
                            id={listing.id}
                            currentUser={currentUser}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            bathroomCount={listing.bathroomCount}
                            guestCount={listing.guestCount}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ListingClient
