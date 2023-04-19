import ClientOnly from '@/app/components/ClientOnly'
import getLisitngById from '../../actions/getListingById'
import EmptyState from '@/app/components/EmptyState'
import getCurrentUser from '@/app/actions/getCurrentUser'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'
interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getLisitngById(params)
    const currentUser = await getCurrentUser()
    const reservations = await getReservations(params)

    if (!listing)
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
                reservations={reservations}
            />
        </ClientOnly>
    )
}

export default ListingPage
