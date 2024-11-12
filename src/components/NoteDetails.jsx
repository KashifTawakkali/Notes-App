import "../assets/css/details.scss";
import { highlightTerms } from "../utils/highlightTerms";

export const NoteDetails = ({ setView, note }) => {
  return (
    <div className="note-details">
      <div className="details-wrapper">
        <div className="details-back-btn" onClick={() => setView(false)}>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <h2 className="details-title">
          <span dangerouslySetInnerHTML={{ __html: highlightTerms(note?.title) }} />
        </h2>
        <span className="details-timeline">{note?.createdAt}</span>
        <div className="details-body">
          <p dangerouslySetInnerHTML={{ __html: highlightTerms(note?.desc) }} />
        </div>
      </div>
    </div>
  );
};
