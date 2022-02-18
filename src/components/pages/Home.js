import React, { useState } from "react";
const Home = () => {
  const [file, setFile] = useState([]);

  const handleChange = async(e) => {
    const data = e.target.files[0];
    const images = await convertBase64(data);
    setFile(images);
  };
  const convertBase64 = (data) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(data);
      filereader.onload = () => {
        resolve(filereader.result);
      };
      filereader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {file && (
        <div>
          <span>{}</span>
          {file}
          <br></br>
          <img src={file} alt="Hellow" />
        </div>
      )}
    </div>
  );
};
export default Home;
