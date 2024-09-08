export default async function Home() {
  return (
    <main className='flex gap-8 flex-col items-center p-6 my-8'>
      <img alt='Logo' className='w-44 h-44' src='/icon.svg' />
      <h1 className='text-5xl font-extrabold text-center max-w-[50rem]'>
        Discover music from the{' '}
        <span className='text-transparent clip-text bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600'>
          Greatest 500
        </span>{' '}
        albums of all time
      </h1>
      <div className='text-lg font-bold text-center'>
        Bored of listening to the same music? Pick a random album from <i>Rolling stone</i>&apos;s
        500 Greatest Albums of All Time.
      </div>
      <div className='flex gap-x-16 gap-y-4 flex-wrap justify-center'>
        <a
          href='/random'
          className='flex gap-2 text-slate-950 bg-sky-400 p-2 rounded-lg items-center'
        >
          <div
            style={{
              maskImage: `url(/random.svg)`,
              maskSize: '100% 100%',
            }}
            className='w-6 h-6 bg-current'
          />
          <div className='font-bold'>Random album</div>
        </a>
        <a
          href='https://github.com/rayliwell/greatest500'
          className='flex gap-2 text-[#2b3137] bg-[#fafbfc] p-2 rounded-lg items-center'
        >
          <div
            style={{
              maskImage: `url(/github.svg)`,
              maskSize: '100% 100%',
            }}
            className='w-6 h-6 bg-current'
          />
          <div className='font-bold'>View source</div>
        </a>
      </div>
    </main>
  )
}
