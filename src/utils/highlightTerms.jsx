import glossaryData from "./glossary.json"; 
import React from "react";

// Function to highlight terms based on the glossary
export const highlightTerms = (text, setTooltipContent) => {
  if (!text) return [];

  const glossaryTerms = Object.keys(glossaryData.Glossary);

  // Split the text into words and highlight terms found in the glossary
  const words = text.split(" ").map((word, index) => {
    const cleanedWord = word.replace(/[^\w\s]/gi, ""); // Remove punctuation for matching
    const definition = glossaryData.Glossary[cleanedWord];

    if (definition) {
      return (
        <span
          key={index}
          className="highlighted-term"
          onMouseEnter={() => setTooltipContent(definition)}
          onMouseLeave={() => setTooltipContent(null)}
        >
          {word}{" "}
        </span>
      );
    }

    return <span key={index}>{word} </span>;
  });

  return words;
};

export default highlightTerms;
