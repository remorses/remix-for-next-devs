# Remix for Next.js Developers

## Routes definition

<SideBySide>

```bash
pages/
├── _app.tsx
├── index.tsx
├── about.tsx
├── concerts/
│   ├── index.tsx
│   ├── trending.tsx
│   └── [city].tsx
```

```bash
app/
├── routes/
│   ├── _index.tsx
│   ├── about.tsx
│   ├── concerts._index.tsx
│   ├── concerts.$city.tsx
│   ├── concerts.trending.tsx
│   └── concerts.tsx
└── root.tsx
```

</SideBySide>

## getServerSideProps

<SideBySide>

```tsx
// Next.js: /pages/index.tsx
export async function getServerSideProps() {
    const data = await fetchData()
    return { props: { data } }
}

const Page = ({ data }) => <div>{data}</div>

export default Page
```

```tsx
// Remix: /routes/index.tsx
import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export let loader: LoaderFunction = async (request) => {
    const data = await fetchData()
    return json(data)
}

// Usage in page component with useLoaderData
export default function Index() {
    let data = useLoaderData<typeof loader>()
    return <div>{data}</div>
}
```

</SideBySide>

## getServerSideProps with redirect

<SideBySide>

```tsx
// Next.js
export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/home',
            permanent: false,
        },
    }
}
```

```tsx
import { LoaderFunction, redirect } from '@remix-run/node'
export let loader: LoaderFunction = async () => {
    return redirect('/home', { status: 307 })
}
```

</SideBySide>

## getServerSideProps notFound

<SideBySide>

```tsx
// Next.js
export async function getServerSideProps() {
    return {
        notFound: true,
    }
}
```

```tsx
import { LoaderFunction } from '@remix-run/node'
export let loader: LoaderFunction = async () => {
    throw new Response('', { status: 404 })
}
```

## API Routes

<SideBySide>

```tsx
// /pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    res.status(200).json({ name: 'John Doe' })
}
```

```tsx
// /routes/api/hello.ts
import { LoaderFunctionArgs, LoaderFunction } from '@remix-run/node'

export let loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
    return new Response(JSON.stringify({ name: 'John Doe' }))
}
```

## useRouter().push

<SideBySide>

```tsx
import { useRouter } from 'next/router'
export default function Index() {
    const router = useRouter()

    return <button onClick={() => router.push('/home')}>Home</button>
}
```

```tsx
// Remix
import { useNavigate } from '@remix-run/react'
export default function Index() {
    const navigate = useNavigate()

    return <button onClick={() => navigate('/home')}>Home</button>
}
```

</SideBySide>

## useRouter().replace

<SideBySide>

```tsx
import { useRouter } from 'next/router'
export default function Index() {
    const router = useRouter()

    return <button onClick={() => router.replace('/home')}>Home</button>
}
```

```tsx
// Remix
import { useNavigate } from '@remix-run/react'
export default function Index() {
    const navigate = useNavigate()

    return (
        <button onClick={() => navigate('/home', { replace: true })}>
            Home
        </button>
    )
}
```

</SideBySide>

## useRouter().reload()

<SideBySide>

```tsx
import { useRouter } from 'next/router'

// Next.js
export default function Index() {
    const router = useRouter()

    return <button onClick={() => router.reload()}>Reload</button>
}
```

```tsx
// Remix
import { useRevalidator } from '@remix-run/react'
export default function Index() {
    const { revalidate, state } = useRevalidator()

    return <button onClick={() => revalidate()}>Reload</button>
}
```

</SideBySide>

## useRouter().query

<SideBySide>

```tsx
import { useRouter } from 'next/router'
// Next.js
export default function Index() {
    const router = useRouter()

    return (
        <button
            onClick={() => {
                router.replace({ query: { ...router.query, name: 'John Doe' } })
            }}
        >
            {router.query.name}
        </button>
    )
}
```

```tsx
// Remix
import { useSearchParams } from '@remix-run/react'
export default function Index() {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <button
            onClick={() =>
                setSearchParams((prev) => {
                    prev.set('name', 'John Doe')
                    return prev
                })
            }
        >
            {searchParams.get('name')}
        </button>
    )
}
```

</SideBySide>

## useRouter().asPath

<SideBySide>

```tsx
import { useRouter } from 'next/router'
// Next.js
export default function Index() {
    const router = useRouter()

    return <div>{router.asPath}</div>
}
```

```tsx
// Remix
import { useLocation } from '@remix-run/react'
export default function Index() {
    const location = useLocation()

    return <div>{location.pathname}</div>
}
```

</SideBySide>

## useRouter().back()

<SideBySide>

```tsx
import { useRouter } from 'next/router'
// Next.js
export default function Index() {
    const router = useRouter()

    return <button onClick={() => router.back()}>Back</button>
}
```

```tsx
// Remix
import { useNavigate } from '@remix-run/react'
export default function Index() {
    const navigate = useNavigate()

    return <button onClick={() => navigate(-1)}>Back</button>
}
```

</SideBySide>

## useRouter().forward()

<SideBySide>

```tsx
import { useRouter } from 'next/router'
// Next.js
export default function Index() {
    const router = useRouter()

    return <button onClick={() => router.forward()}>Forward</button>
}
```

```tsx
// Remix
import { useNavigate } from '@remix-run/react'
export default function Index() {
    const navigate = useNavigate()

    return <button onClick={() => navigate(1)}>Forward</button>
}
```

## dynamic params

<SideBySide>

```tsx
import { useRouter } from 'next/router'

export function getServerSideProps({ params }) {
    return { props: { params } }
}

// Next.js
export default function Index({ params }) {
    const router = useRouter()

    return (
        <div>
            {params.name} is same as {router.query.name}
        </div>
    )
}
```

```tsx
// Remix
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useParams } from '@remix-run/react'

export function loader({ params }: LoaderFunctionArgs) {
    return json({ params })
}

export default function Index() {
    const params = useParams()

    return <div>{params.name}</div>
}
```

## getStaticProps

<SideBySide>

```tsx
export function getStaticProps({ params }) {
    return { props: { params } }
}

export const revalidate = 60

export default function Index({ params }) {
    return <div>{params.name}</div>
}
```

```tsx
// Remix
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export function loader({ params }: LoaderFunctionArgs) {
    return json(
        { params },
        {
            headers: {
                // you will need a CDN on top
                'Cache-Control': 'public, stale-while-revalidate=60',
            },
        },
    )
}

export default function Index() {
    const data = useLoaderData<typeof loader>()

    return <div>{data.params.name}</div>
}
```

## \_error.jsx

<SideBySide>

```tsx
function Error({ statusCode }) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
```

```tsx
import { useRouteError } from '@remix-run/react'
// root.tsx
export function ErrorBoundary() {
    const error: any = useRouteError()
    return <div>{error.message}</div>
}
```

## useRouter().events

<SideBySide>

```tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Index() {
    const router = useRouter()

    const [isNavigating, setIsNavigating] = useState(false)
    useEffect(() => {
        router.events.on('routeChangeStart', () => setIsNavigating(true))
        router.events.on('routeChangeComplete', () => setIsNavigating(false))
        router.events.on('routeChangeError', () => setIsNavigating(false))
    }, [router.events])

    return <div>{isNavigating ? 'Navigating...' : 'Not navigating'}</div>
}
```

```tsx
import { useNavigation } from '@remix-run/react'

export default function Index() {
    const { state } = useNavigation()

    return <div>{state === 'loading' ? 'Navigating...' : 'Not navigating'}</div>
}
```

</SideBySide>
