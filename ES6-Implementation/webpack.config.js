module.exports = {
  entry: "./assets/scripts/index.js",
  output: {
    path: __dirname,
    filename: "./assets/scripts/bundle.js"
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['react', 'es2015'] 
        }
      }
    ],
    
  }
}
