'use client'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    router.replace('/sign-in')
  return (
    <div className=' h-screen w-full flex justify-center items-center'>
      Loading...
    </div>
  )
}