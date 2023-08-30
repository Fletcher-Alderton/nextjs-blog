"use client"

import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer/MarkdownRenderer';
import "../components/MarkdownRenderer/MarkdownRenderer.css";

export default function Page({ params }) {
  const { slug } = params;

  // Construct the file path for the Markdown content and images
  const markdownFilePath = `/content/${slug}/${slug}.md`;
  

  return (
    <>
      <MarkdownRenderer filePath={markdownFilePath} className="ml-10"/>
    </>
  );
}