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
import { LoaderFunction, redirect } from "@remix-run/node";
export let loader: LoaderFunction = async () => {
  return redirect('/home');
};
```

</SideBySide>
