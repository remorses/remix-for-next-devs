# Remix for Next.js Developers

## getServerSideProps to Data Loader

<SideBySide>

```tsx
// Next.js: /pages/index.tsx
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

const Page = ({ data }) => <div>{data}</div>;

export default Page;
```

```tsx
// Remix: /routes/index.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export let loader: LoaderFunction = async (request) => {
  const data = await fetchData();
  return json(data);
};

// Usage in page component with useLoaderData
export default function Index() {
  let data = useLoaderData();
  return <div>{data}</div>;
}
```

</SideBySide>

## Redirect Handling

<SideBySide>

```tsx
// Next.js
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/home',
      permanent: false,
    },
  };
}
```

```tsx
// Remix
export let loader: LoaderFunction = async () => {
  return redirect('/home');
};
```

</SideBySide>

## Navigation Events with useState vs useNavigation

<SideBySide>

```tsx
// Next.js
const [isNavigating, setIsNavigating] = useState(false);

useEffect(() => {
  const handleRouteChangeStart = () => setIsNavigating(true);
  const handleRouteChangeComplete = () => setIsNavigating(false);

  router.events.on('routeChangeStart', handleRouteChangeStart);
  router.events.on('routeChangeComplete', handleRouteChangeComplete);

  return () => {
    router.events.off('routeChangeStart', handleRouteChangeStart);
    router.events.off('routeChangeComplete', handleRouteChangeComplete);
  };
}, [router.events]);
```

```tsx
// Remix
let navigation = useNavigation();
let isNavigating = navigation.state === 'idle';
```

</SideBySide>