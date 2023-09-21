export default async function getData() {
  try {
    const res = await fetch("/https://jsonplaceholder.typicode.com/posts", {
      next: {tags: ["posts"]},
    });
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
