'use client'
import axios from 'axios'
import { categories } from '@/app/components/navbar/Categories'
import { SafeListing, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Container from '@/app/components/Container'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingHead from '../../components/listings/ListingHead'
import useLoginModal from '@/app/hooks/useLoginModal'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { toast } from 'react-hot-toast'
import ListingReservation from '@/app/components/listings/ListingReservation'
import { Range } from 'react-date-range'

interface ListingClientProps {
    reservations?: Reservation[]
    listing: SafeListing & { user: SafeUser }
    currentUser?: SafeUser | null
}

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

const ListingClient: React.FC<ListingClientProps> = ({
    reservations,
    listing,
    currentUser,
}) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])

    const loginModal = useLoginModal()
    const router = useRouter()
    const disabledDates = useMemo(() => {
        let dates: Date[] = []
        reservations?.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })
            dates = [...dates, ...range]
        })
        return dates
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if (!currentUser) return
        setIsLoading(true)

        axios
            .post('/api/reservations', {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id,
            })
            .then(() => {
                toast.success('Listing reserved!')
                setDateRange(initialDateRange)
                // Redirect to trips...
                router.refresh()
            })
            .catch((error) => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false))
    }, [totalPrice, dateRange, router, currentUser, listing?.id])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && listing.price)
                setTotalPrice(dayCount * listing.price)
            else setTotalPrice(listing.price)
        }
    }, [dateRange, listing.price])

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
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ListingClient
