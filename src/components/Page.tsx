import { ReactNode } from 'react';

type PageProps = {
  title: string,
  children: ReactNode
}

const Page = ({ title, children }: PageProps) => {
  return (
    <section className="w-full max-w-3xl flex flex-col">
      <header className="text-white mb-8 p-4 flex item-center justify-center">
        <h1 className="font-serif text-base xl:text-xl drop-shadow-sm font-bold uppercase text-center items-center justify-center rounded-full bg-pink-400/10 py-4 px-8">
          {title}
        </h1>
      </header>
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </section>
  )
}

export default Page
