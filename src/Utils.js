import React from "react";

function CleanText(text) {
    if (text) {
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
    ];
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomItem = array[randomIndex];
    return randomItem;
}
export { CleanText, GetRandomBackground };
