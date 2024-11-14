import React, { useState } from "react";
import highlightTerms from "../utils/highlightTerms"; 
import "../assets/css/card.scss";

// Handle the preview and display logic correctly
export const NoteCard = ({ onUpdate, onDelete, note }) => {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle full details

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle visibility of full content
  };

  return (
    <div className="note-card">
      <div className="note-card-wrapper">
        <h2 className="card-title">
          {highlightTerms(note?.title, setTooltipContent)}
        </h2>
        <div className="card-body">
          {highlightTerms(note?.desc, setTooltipContent)}
        </div>

        {tooltipContent && (
          <div className="tooltip show-tooltip">{tooltipContent}</div>
        )}

        {/* "Read more" button toggles full content */}
        <span className="card-details" onClick={toggleExpand}>
          {isExpanded ? "Show less" : "Read more"}
        </span>

        {/* Full note details */}
        {isExpanded && (
          <div className="full-details">
            <p><strong>Title:</strong> {note?.title}</p>
            <p><strong>Description:</strong> {note?.desc}</p>
            <p><strong>Created At:</strong> {note?.createdAt}</p>
          </div>
        )}

        <div className="card-footer">
          <span className="card-timeline">{note?.createdAt}</span>
          <div className="card-actions">
            <div className="action-item" onClick={() => onUpdate(note)}>
              <i className="fa-solid fa-pen-to-square edit"></i>
            </div>
            <div className="action-item" onClick={() => onDelete(note?.id)}>
              <i className="fa-solid fa-trash-can delete"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
