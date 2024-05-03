import { Children } from 'react'

export function SideBySide({ children }: { children: React.ReactNode }) {
    const [first, second] = Children.toArray(children)

    return (
        <div className='flex w-full flex-col md:flex-row grow max-w-full gap-4'>
            <div className='flex md:w-[50%] flex-col gap-4'>{first}</div>
            <div className='flex md:w-[50%] flex-col gap-4'>{second}</div>
        </div>
    )
}
