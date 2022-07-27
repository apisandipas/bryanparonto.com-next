export const sortByDate = (a, b) => {
  return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date);
};



export function uniqueFilter(value, index, self) {
  return self.indexOf(value) === index;
}
