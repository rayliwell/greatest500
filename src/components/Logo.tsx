export default function Logo({ src, href, name }: { src: string; href: string; name: string }) {
  return (
    <a href={href} className='p-2 block rounded-lg hover:bg-slate-800 active:bg-slate-700'>
      <img src={src} className='h-8 w-8' alt={`${name} icon`} />
    </a>
  )
}
