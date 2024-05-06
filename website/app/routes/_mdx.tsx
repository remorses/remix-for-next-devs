import { MetaFunction, Outlet } from '@remix-run/react'
import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from 'mdx/types'

const components: MDXComponents = {}

export const meta: MetaFunction = ({ location }) => {
    return [
        { title: `Remix for Next.js Developers` }, //
        {
            name: 'description',
            content:
                'Snippets of code translated from Next.js to Remix. Learn Remix by example.',
        },
    ]
}

export default function Page() {
    return (
        <MDXProvider components={components}>
            <div className='px-6 md:px-12 pt-12 pb-24 md:pt-24 w-full flex flex-col items-center '>
                <div
                    style={{
                        contentVisibility: 'auto',
                    }}
                    className='prose gap-1 flex flex-col items-center min-w-0 w-full max-w-[1800px]'
                >
                    <Outlet />
                </div>
                <div className='pt-24'>
                    Written by{' '}
                    <a className='underline' href='https://twitter.com/__morse'>
                        @__morse
                    </a>
                </div>
            </div>
        </MDXProvider>
    )
}
