export default function Arrow({
  position,
  direction,
}: {
  position: number
  direction: 'up' | 'down'
}) {
  let disabled =
    (direction === 'up' && position === 1) || (direction === 'down' && position === 500)

  let nextPosition = position + (direction === 'up' ? -1 : 1)
  let nextPositionText = <div className='font-bold'>#{nextPosition}</div>

  return (
    <div className={disabled ? 'text-slate-600 select-none' : 'text-slate-400'}>
      <a
        href={disabled ? undefined : `/album/2023/${nextPosition}`}
        className={
          'my-2 flex items-center' +
          (direction === 'up' ? ' flex-col-reverse md:flex-col' : ' flex-col ')
        }
      >
        {direction === 'down' && nextPositionText}
        <div
          style={{
            maskImage: `url(/${direction}.svg)`,
            maskSize: '100% 100%',
          }}
          className='w-16 h-16 bg-current'
        />
        {direction === 'up' && nextPositionText}
      </a>
    </div>
  )
}
