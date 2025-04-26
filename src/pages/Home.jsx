import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12 text-center">
        <Container>
          <p className="text-gray-500">Loading posts...</p>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <Container>
          <h1 className="text-2xl font-medium text-gray-700">
            No posts available yet
          </h1>
          <p className="mt-2 text-gray-500">
            Check back later or create a new post
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
