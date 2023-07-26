import { Translator } from '@/components/Translator'

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div>
        <h1 className='text-4xl font-bold text-white mb-4'>Translator</h1>
        <Translator />
      </div>
    </main>
  )
}
