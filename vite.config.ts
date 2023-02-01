import path from 'path';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import react from '@vitejs/plugin-react';

export default defineConfig({
    assetsInclude: ['**/*.cjs'],
    resolve: {
        alias: {
            '@/': path.join(__dirname, 'src/'),
        },
    },
    build: {
        commonjsOptions: {
            esmExternals: true,
        },
    },
    plugins: [
        viteTsconfigPaths(),
        viteCommonjs(),
        dynamicImport(),
        svgrPlugin({
            svgrOptions: {
                svgo: true,
                icon: false,
                svgoConfig: {
                    plugins: [{ moveGroupAttrsToElems: true }, { convertPathData: true }],
                },
            },
        }),
        react({
            babel: {
                plugins: [
                    [
                        'babel-plugin-styled-components',
                        {
                            displayName: true,
                            fileName: false,
                        },
                    ],
                ],
            },
        }),
    ],
    server: {
        open: true,
    },
});
