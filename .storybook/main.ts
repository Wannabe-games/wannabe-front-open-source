const path = require('path');
const macrosPlugin = require('vite-plugin-babel-macros');
const svgrPlugin = require('vite-plugin-svgr');
const { default: tsconfigPaths } = require('vite-tsconfig-paths');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-designs',
    ],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-vite',
    },
    staticDirs: ['../public'],
    features: { storyStoreV7: true },
    async viteFinal(config, { configType }) {
        if (configType === 'PRODUCTION') {
            config.base = '/storybook/';
            config.build.sourcemap = false;
        }
        config.plugins = [
            ...config.plugins,
            tsconfigPaths({
                projects: [path.resolve(path.dirname(__dirname), 'tsconfig.json')],
            }),
            macrosPlugin,
            svgrPlugin({
                svgrOptions: {
                    svgo: true,
                    icon: false,
                    svgoConfig: {
                        plugins: ['moveGroupAttrsToElems', 'convertPathData'],
                    },
                },
            }),
        ];

        return config;
    },
};
