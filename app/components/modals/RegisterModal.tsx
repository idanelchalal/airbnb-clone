'use client'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Heading from '../Heading'
import Input from '../inputs/Input'

import axios from 'axios'
import Button from '../Button'
import { signIn } from 'next-auth/react'
const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        try {
            await axios.post('/api/register', data)
            registerModal.onClose()
        } catch (err) {
            toast.error('Something went wrong.')
        } finally {
            setIsLoading(false)
        }
    }
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
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
                    <div>Already have an account?</div>
                    <div
                        onClick={registerModal.onClose}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            title="Register"
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            body={bodyContent}
            footer={footerContent}
            actionLabel="Sign Up!"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default RegisterModal
