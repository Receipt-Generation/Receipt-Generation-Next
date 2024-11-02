import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className=' h-screen w-full flex justify-center items-center'>
      <SignIn
      appearance={{
        elements: {
          formButtonPrimary: 'your-org-button org-red-button',
          footer: 'hidden'
        },
      }}
      />
    </div>
  )
}