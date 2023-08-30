import React from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

const HomePage = ({ posts }) => {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="post-item"
            onClick={() => router.push(`/content/${post.slug}`)}
          >
            <img src={post.thumbnail} alt={post.title} />
            <h2>{post.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
