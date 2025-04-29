import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition-colors">
        <div className="w-full flex justify-center mb-4 h-48 overflow-hidden">
          {featuredImage ? (
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className="rounded-xl h-full w-full object-cover"
            />
          ) : (
            <div className="bg-gray-300 rounded-xl h-full w-full flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
