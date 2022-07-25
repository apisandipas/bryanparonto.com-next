const codeHighlight = require("@orgajs/reorg-shiki").default;
const path = require("path");
// const withOrga = require("@orgajs/next").default({
//   defaultLayout: require.resolve("./src/components/layout.tsx"),
//   reorgPlugins: [
//     [
//       codeHighlight,
//       {
//         langs: [
//           {
//             id: "org",
//             scopeName: "source.org",
//             path: path.resolve(__dirname, "org.tmLanguage.json"),
//           },
//         ],
//       },
//     ],
//   ],
//   estree: {},
// });

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  // pageExtensions: ["js", "jsx", "tsx", "org"],
};
