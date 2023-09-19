export default async function getData() {
  const res = await fetch("/api", {
    next: {tags: ["posts"]},
  });
  const posts = await res.json();
  console.log("getData", posts);
  return posts;
}
