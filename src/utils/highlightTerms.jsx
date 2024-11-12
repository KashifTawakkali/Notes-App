// highlightTerms.jsx
import { glossary } from "./glossary";

export function highlightTerms(text) {
  let highlightedText = text;

  Object.keys(glossary).forEach((term) => {
    const regex = new RegExp(`\\b${term}\\b`, "gi");
    const definition = glossary[term] || "No definition available";
    
    highlightedText = highlightedText.replace(
      regex,
      `<span class="highlighted-term" data-tooltip="${definition}">${term}</span>`
    );
  });

  return highlightedText;
}
