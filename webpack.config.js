const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
    plugins: [
    new HtmlWebpackPlugin({
        template: 'public/index.html',
        title: 'DaVinciHosting'
    }),
    new VueLoaderPlugin(),
],

module: {
   
    rules: [
       
        {
           
            test: /\.js$/, 
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                },
            },
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.(png|jpg|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
        {
            test: /\.vue$/,
            use: 'vue-loader',
        }
    ],
},
}