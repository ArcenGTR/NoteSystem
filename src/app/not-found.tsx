import Image from 'next/image'

export const metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
    return (
        <div className='mx-auto gap-6 w-full justify-center items-center flex flex-col h-screen bg-black bg-cover bg-center' style={{backgroundImage: "url('/images/layered-waves-haikei-big.svg')",}}>

        <Image className='rounded-full' src="/images/404.jpg" alt="404 - Page Not Found" width={200} height={200} sizes='200px' priority/>

        <h2 className="text-2xl font-bold text-yellow-100">
            404 - Page Not Found
        </h2>
        
        </div>
        )
  }