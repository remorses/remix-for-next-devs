import { Children } from 'react'

export function SideBySide({ children }: { children: React.ReactNode }) {
    const [first, second] = Children.toArray(children)

    return (
        <div className='flex w-full flex-col md:flex-row grow max-w-full gap-4 md:gap-12'>
            <div className='flex md:w-[50%] flex-col '>{first}</div>
            <div className='flex md:w-[50%] flex-col '>{second}</div>
        </div>
    )
}
