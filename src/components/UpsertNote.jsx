import { useState, useRef, useEffect } from "react";
import "../assets/css/upsert.scss";
import { v4 as getID } from "uuid";

export const UpsertNote = ({ setOpen, note, createNote, updateNote }) => {
  const [title, setTitle] = useState(note ? note?.title : "");
  const [desc, setDesc] = useState(note ? note?.desc : "");
  const editorRef = useRef(null);

  const clearInputs = () => {
    setTitle("");
    setDesc("");
    if (editorRef.current) editorRef.current.textContent = "";
  };

  const handleClear = (event) => {
    event.preventDefault();
    clearInputs();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = editorRef.current.innerText; // Use innerText instead of innerHTML
    setDesc(content);

    if (note) {
      // Update note
      updateNote({
        ...note,
        title,
        desc: content,
      });
    } else {
      // Create note
      createNote({
        id: getID(),
        title,
        desc: content,
        createdAt: new Date().toDateString(),
      });
    }

    clearInputs();
    setOpen(false);
  };

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.textContent = desc; // Set content as plain text
    }
  }, [desc]);

  return (
    <div className="upsert-note">
      <div className="upsert-wrapper">
        <div className="upsert-header">
          <h2 className="heading">{note ? "Update Note" : "Add Note"}</h2>
          <div className="close-btn" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <form className="upsert-form" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Title"
            className="input-form"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Toolbar with formatting options */}
          <div className="editor-toolbar">
            <button type="button" onClick={() => handleFormat("bold")}>
              <b>B</b>
            </button>
            <button type="button" onClick={() => handleFormat("italic")}>
              <i>I</i>
            </button>
            <button type="button" onClick={() => handleFormat("underline")}>
              <u>U</u>
            </button>
            <button type="button" onClick={() => handleFormat("strikethrough")}>
              <s>S</s>
            </button>
            <button type="button" onClick={() => handleFormat("justifyLeft")}>
              <i className="fa fa-align-left"></i>
            </button>
            <button type="button" onClick={() => handleFormat("justifyCenter")}>
              <i className="fa fa-align-center"></i>
            </button>
            <button type="button" onClick={() => handleFormat("justifyRight")}>
              <i className="fa fa-align-right"></i>
            </button>
            <button type="button" onClick={() => handleFormat("insertOrderedList")}>
              <i className="fa fa-list-ol"></i>
            </button>
            <button type="button" onClick={() => handleFormat("insertUnorderedList")}>
              <i className="fa fa-list-ul"></i>
            </button>
            <select
              onChange={(e) => handleFormat("fontSize", e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Font Size
              </option>
              <option value="1">Small</option>
              <option value="3">Normal</option>
              <option value="5">Large</option>
            </select>
            <select
              onChange={(e) => handleFormat("foreColor", e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Text Color
              </option>
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
            </select>
            <select
              onChange={(e) => handleFormat("hiliteColor", e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Background Color
              </option>
              <option value="yellow">Yellow</option>
              <option value="lightblue">Light Blue</option>
              <option value="lightgreen">Light Green</option>
              <option value="pink">Pink</option>
            </select>
            <select
              onChange={(e) => handleFormat("fontName", e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Font Family
              </option>
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>

          {/* Rich text editor */}
          <div
            ref={editorRef}
            className="rich-text-area"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={() => setDesc(editorRef.current.innerText)} 
          ></div>

          <div className="upsert-actions">
            <button className="clear-btn" onClick={handleClear}>
              Clear
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
