export default async function getData() {
  try {
    const res = await fetch("/api", {
      next: {tags: ["posts"]},
    });
    const posts = await res.json();
    console.log("getData", posts);
    return posts;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
