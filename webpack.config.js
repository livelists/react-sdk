const path = require('path');


module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        clean: true,
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    externals: {
        react: 'react',
        protobufjs: 'protobufjs',
        'protobufjs/minimal': 'protobufjs',
        events: 'events',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }
        ],
    }
}
