import React, { useState } from "react";
import "../styles/Styles.css";

const FileInput = (props) => {
    // const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const paths = files.map((file) => URL.createObjectURL(file));
        props.setSelectedImage(paths);
    };

    return (
        <form className="image-upload">
            {props.multiple === "true" ? (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                />
            ) : (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            )}

            <div className="image-upload-wrap">
                {props.selectedImage
                    ? props.selectedImage.map((path, index) => {
                          return (
                              <div
                                  className="preview"
                                  style={{
                                      backgroundImage: `url(${path})`,
                                  }}
                              ></div>
                          );
                      })
                    : ""}
            </div>
        </form>
    );
};

export default FileInput;
