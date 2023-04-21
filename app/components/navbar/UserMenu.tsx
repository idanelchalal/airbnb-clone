'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState, useCallback } from 'react'
import MenuItem from './MenuItem'
import Avatar from '../Avatar'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => setIsOpen((lastSnap) => !lastSnap), [])
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const rentModal = useRentModal()
    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        // Rent Modal
        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    return (
        <div
            className="
    relative
    "
        >
            <div
                className="
        flex flex-row items-center gap-3
        "
            >
                <div
                    className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
            "
                    onClick={() => onRent()}
                >
                    Airbnb your home
                </div>
                <div
                    className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                rounded-full
                gap-3
                hover:shadow-md
                transition
                
                "
                    onClick={() => toggleOpen()}
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar imageSrc={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <>
                            {currentUser ? (
                                <>
                                    <MenuItem
                                        onClick={() => {
                                            router.push('/trips')
                                        }}
                                        label="My trips"
                                    />
                                    <MenuItem
                                        onClick={() => {
                                            router.push('/favorites')
                                        }}
                                        label="My favorites"
                                    />

                                    <MenuItem
                                        onClick={() =>
                                            router.push('/reservations')
                                        }
                                        label="My reservations"
                                    />

                                    <MenuItem
                                        onClick={() => {
                                            router.push('/properties')
                                        }}
                                        label="My properties"
                                    />
                                    <MenuItem
                                        onClick={() => onRent()}
                                        label="Airbnb my home"
                                    />
                                    <hr />

                                    <MenuItem
                                        onClick={() => signOut()}
                                        label="Logout"
                                    />
                                </>
                            ) : (
                                <>
                                    <MenuItem
                                        onClick={() => {
                                            loginModal.onOpen()
                                        }}
                                        label="Login"
                                    />
                                    <MenuItem
                                        onClick={() => {
                                            registerModal.onOpen()
                                        }}
                                        label="Sign Up"
                                    />
                                </>
                            )}
                        </>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
