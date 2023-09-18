import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const handleOnChange = (event) => {
    // console.log("Text was changed.");
    setText(event.target.value);

    // console.log(setText(event.target.value));
    // console.log("change in text", text);
  };

  const handleUpClick = () => {
    // console.log("UpperCase was clicked.");
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase!", "success");
  };

  const handleLowClick = () => {
    // console.log("LowerCase was clicked.");
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase!", "success");
    return newText;
  };
  const handleRemoveSpace = () => {
    // console.log("Remove Extra Spaces was clicked.");
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Spaces removed!", "success");
    return newText;
  };

  const handleCapitalWord = () => {
    // console.log("Capital First Letter of Word was clicked.");

    //handleLowClick();
    let newText = handleLowClick();
    setText(
      newText
        .split(" ")
        .map((i) => i[0].toUpperCase() + i.slice(1))
        .join(" ")
    );
    props.showAlert("Converted first letter capital of every word!", "success");
    //other solution:
    // let i = 0;
    // newText = newText.split(" ");
    // newText.forEach((word) => {
    //   word = word[0].toUpperCase() + word.slice(1);
    //   newText[i] = word;
    //   i++;
    // });
    // setText(newText.join(" "));
  };

  const handleCapitalSent = () => {
    console.log("Capital First Letter of Sentence was clicked.");
    let newText = handleLowClick();
    setText(
      newText
        .split(". ")
        .map((i) => i[0].toUpperCase() + i.slice(1))
        .join(". ")
    );
    props.showAlert(
      "Converted first letter capital of every sentence!",
      "success"
    );
  };
  const handleCopyClick = () => {
    // console.log("Copy was clicked.");
    let newText = document.getElementById("myBox");
    newText.select();
    navigator.clipboard.writeText(newText.value);
    props.showAlert("Copied to Clipboard!", "success");
  };
  const handleClearClick = () => {
    // console.log("LowerCase was clicked.");
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared!", "success");
  };

  return (
    <>
      <div
        style={{ color: props.theme === "light" ? "black" : "white" }}
        className="container my-5"
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            value={text}
            className="form-control"
            onChange={handleOnChange}
            style={{
              backgroundColor: props.theme === "light" ? "white" : "grey",
              color: props.theme === "light" ? "black" : "white",
            }}
            id="myBox"
            rows="8"
            placeholder="Enter the text"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to UpperCase
        </button>
        <button className="btn btn-warning mx-1" onClick={handleLowClick}>
          Convert to LowerCase
        </button>
        <button className="btn btn-success mx-1" onClick={handleRemoveSpace}>
          Remove Extra Spaces
        </button>
        <button className="btn btn-secondary mx-1" onClick={handleCapitalWord}>
          Capital First letter of Words
        </button>
        <button className="btn btn-dark mx-1" onClick={handleCapitalSent}>
          Capital First letter of Sentence
        </button>
        <button className="btn btn-info mx-1" onClick={handleCopyClick}>
          Copy
        </button>
        <button className="btn btn-danger mx-1" onClick={handleClearClick}>
          Clear
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.theme === "light" ? "black" : "white" }}
      >
        <h2>Your text Summary:</h2>

        <p>
          <b>{text.split(" ").length} </b>words and <b>{text.length} </b>
          characters
        </p>
        <p>
          <b>{0.006 * text.split(" ").length}</b> Minutes Read
        </p>
        <h2>Preview:</h2>
        <p>
          {text.length > 0
            ? text
            : "Enter something in the textbox to preview it here."}
        </p>
      </div>
    </>
  );
}
