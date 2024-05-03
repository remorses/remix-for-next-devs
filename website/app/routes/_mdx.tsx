import { Outlet } from '@remix-run/react'
import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
    code({ children, ...props }) {
        return <code {...props}>{children}</code>
    },
}

export default function Page() {
    return (
        <MDXProvider components={components}>
            <div className='w-full flex flex-col items-center '>
                <div className='prose max-w-[1800px]'>
                    <Outlet />
                </div>
            </div>
        </MDXProvider>
    )
}
