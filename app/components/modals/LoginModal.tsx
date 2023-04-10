'use client'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'

const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        signIn('credentials', { ...data, redirect: false }).then((callback) => {
            setIsLoading(false)

            if (callback?.ok) {
                toast.success('Logged In!')
                router.refresh()
                loginModal.onClose()
            }

            if (callback?.error) toast.error(callback.error)
        })
    }
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome Back!" subtitle="Login to your account" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div
            className="
            flex flex-col gap-4 mt-3 
        "
        >
            <hr />
            <Button
                onClick={() => {
                    signIn('google')
                }}
                outline
                label="Continue with Google"
                icon={FcGoogle}
            />
            <Button
                onClick={() => signIn('github')}
                outline
                label="Continue with Github"
                icon={AiFillGithub}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>First time using airbnb?</div>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Create an account!
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            title="Login"
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            body={bodyContent}
            footer={footerContent}
            actionLabel="Sign In"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default LoginModal
