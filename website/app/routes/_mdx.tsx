import { Outlet } from '@remix-run/react'

export default function Page() {
    return (
        <div className='w-full flex flex-col items-center '>
            <div className='prose max-w-[1800px]'>
                <Outlet />
            </div>
        </div>
    )
}
