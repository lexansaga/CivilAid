import React from "react";

function CleanText(text) {
    if (IsNull(text)) {
        // Replace spaces with dots
        let cleanedText = text.replace(/\s+/g, "-");

        // Remove special characters
        cleanedText = cleanedText.replace(/[^\w\s]/gi, "");

        // Convert to lowercase
        cleanedText = cleanedText.toLowerCase();

        return cleanedText;
    }
    return text;
}
function GetRandomBackground() {
    const array = [
        "https://firebasestorage.googleapis.com/v0/b/civilaid-65d59.appspot.com/o/Assets%2FPlaceholder%2Fplaceholder-1.jpg?alt=media&token=de64abfa-5aa1-4f0e-827f-e1f70bcc9be2",
        "https://firebasestorage.googleapis.com/v0/b/civilaid-65d59.appspot.com/o/Assets%2FPlaceholder%2Fplaceholder-2.jpg?alt=media&token=44c3bdcd-f9d0-42c1-a230-dacc22e9f068",
        "https://firebasestorage.googleapis.com/v0/b/civilaid-65d59.appspot.com/o/Assets%2FPlaceholder%2Fplaceholder-3.jpg?alt=media&token=ee52a178-677a-4d21-bfab-7712e86bb70f",
        "https://firebasestorage.googleapis.com/v0/b/civilaid-65d59.appspot.com/o/Assets%2FPlaceholder%2Fplaceholder-4.jpg?alt=media&token=33cc8019-4a07-4632-b899-293e87a5e18a",
        "https://firebasestorage.googleapis.com/v0/b/civilaid-65d59.appspot.com/o/Assets%2FPlaceholder%2Fplaceholder-5.jpg?alt=media&token=0f534fa5-7705-4f2f-909f-23efd1241b68",
    ];
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomItem = array[randomIndex];
    return randomItem;
}
function IsNull(value) {
    return typeof value !== "undefined" && value != null; // Defined
}

function NoContent(props) {
    return (
        <>
            <div className="no-content">
                <h2>{props.content}</h2>
            </div>
        </>
    );
}
export { CleanText, GetRandomBackground, IsNull, NoContent };
