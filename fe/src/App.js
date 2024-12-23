
import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Chọn file đi rồi hả upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error || "Toang rồi đại vương!");
      }
    } catch (error) {
      console.error("Toang rồi đại vương:", error);
      alert("Toang rồi đại vương.");
    }
  };

  return (
    <div>
      <h1>Hello, chọn file .csv đi nào!</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
