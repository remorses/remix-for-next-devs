import { remarkCodeHike } from '@code-hike/mdx'

import {
    vitePlugin as remix,
    cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev'
import mdx from '@mdx-js/rollup'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkFrontmatter from 'remark-frontmatter'

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        remixCloudflareDevProxy(),
        mdx({
            remarkPlugins: [
                remarkFrontmatter,
                remarkMdxFrontmatter,
                [remarkCodeHike, { theme: 'github-dark' }],
            ],

            mdxExtensions: ['.md', '.mdx'],
            mdExtensions: [],
            providerImportSource: '@mdx-js/react',
        }),
        remix({}),
        tsconfigPaths(),
    ],
})
