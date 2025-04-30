import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          const postData = await appwriteService.getPost(slug);
          if (postData) {
            setPost(postData);
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen py-12 bg-gray-50 rounded-lg">
      <Container>
        {/* Featured Image with Author Controls */}
        <div className="relative mb-8 group">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="w-full h-auto max-h-96 object-cover rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl"
          />
        </div>

        {/* Post Content */}
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {post.title}
            </h1>
            {post.createdAt && (
              <p className="text-gray-500 text-sm">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            )}
          </header>

          <div className="prose max-w-none prose-lg text-gray-700">
            {parse(post.content)}
          </div>
        </article>

        {/* Back Button */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-700 text-gray-800 px-6 py-2 rounded-lg transition-colors"
          >
            ← Back to Posts
          </Button>

          {isAuthor && (
            <div className="flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-600 hover:bg-green-700"
                  className="px-4 py-2 transition-colors min-w-[80px]"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-600 hover:bg-red-700"
                onClick={deletePost}
                className="px-4 py-2 transition-colors min-w-[80px]"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
