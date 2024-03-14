import React, { useState, useRef } from "react";

const ItemImage = ({ image, onUpload }) => {
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file)
    //   onUpload(file);
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-block"
    >
      <img className="w-40 h-auto" src={image} />
      {hovered && (
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <label htmlFor="file-input">
            <svg
            className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
            </svg>
          </label>
          <input
            id="file-input"
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      )}
    </div>
  );
};

export default ItemImage;
