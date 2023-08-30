import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownRenderer.css'; // Import the updated CSS file for the component

export default function MarkdownRenderer({ filePath }) {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    // Load the Markdown file content here.
    // Make sure to adjust the file path as needed.
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => setMarkdownContent(data));
  }, [filePath]);

  // Split the markdownContent into an array of heading and paragraph pairs
  const contentArray = markdownContent.split(/(?=## )/).filter(Boolean);

  // Helper function to generate a random background color
  const getRandomColor = () => {
    const colors = ['#FFECE4', '#EAFFFE', '#F0EBFF', '#FFF8EC', '#ECEFFE',];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Helper function to count the number of lines in the given text
  const countLines = (text) => {
    const lineBreaks = text.match(/\n/g);
    return lineBreaks ? lineBreaks.length + 1 : 1;
  };

  return (
    <div className="container">
      {contentArray.map((item, index) => {
        // Extract the heading and paragraph from each pair
        const [heading, ...paragraphLines] = item.split('\n');

        // Join the paragraph lines to create the paragraph content
        const paragraph = paragraphLines.join('\n');

        // Generate a random background color for the container
        const containerStyle = {
          backgroundColor: getRandomColor(),
          gridRowEnd: `span ${countLines(paragraph) }`, // Adjust the height based on the number of lines
        };

        return (
          <div key={index} className="item" style={containerStyle}>
            <div>
              <ReactMarkdown
              className=' text-black'
              >{heading}</ReactMarkdown>
            </div>
            <div>
              <ReactMarkdown
              className=' text-black'
              >{paragraph}</ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
}