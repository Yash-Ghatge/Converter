import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [canvasCode, setCanvasCode] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("http://localhost:4000/api/convert", formData);
    const generatedCode = res.data.code;
    setCanvasCode(generatedCode);

    try {
      const runCode = new Function(generatedCode);
      runCode();
    } catch (err) {
      console.error("Error executing canvas code:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">
        Welcome to Canvas Converter
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full max-w-xs text-sm text-white
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-600 file:text-white
             hover:file:bg-blue-700 cursor-pointer border-2 p-1 rounded-2xl"
          />

          {imageURL && (
            <img
              src={imageURL}
              alt="Preview"
              className="w-full max-w-md border rounded"
            />
          )}

          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-10 shadow hover:bg-blue-700"
          >
            Convert to Canvas.js
          </button>
        </div>
        <div className="space-y-4">
          <canvas
            id="canvas"
            width="500"
            height="500"
            className="border w-full rounded-2xl"
          />
          <textarea
            className="w-full h-60 p-2 border rounded"
            value={canvasCode}
            readOnly
          />
          <button
            onClick={() => navigator.clipboard.writeText(canvasCode)}
            className="bg-blue-600 mb-10 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
