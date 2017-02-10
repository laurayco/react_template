module.exports = {
  entry: "./obj/app.js",
  loader: "babel",
  query: {
    presets: [
      "react",
      "es2015"
    ]
  },
  output: {
    filename: "bundle.js"
  },
  externals: {
    "react": "React"
  }
};
