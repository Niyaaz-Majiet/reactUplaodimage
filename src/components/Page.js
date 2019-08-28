import React, { useState } from "react";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";

import "../App.css";


function Page() {
  const [isUploading, uploadState] = useState(false);
  const [progress, updateProgress] = useState(0);
  const [avatarUrl, changeAvatarUrl] = useState("");

  const handleUploadStart = () => {
    uploadState(true);
    updateProgress(0);
  };

  const handleProgress = progress => {
    updateProgress(progress);
  };

  const handleUploadError = error => {
    uploadState(false);
    console.log(error);
  };

  const handleUploadSuccess = async fileName => {

    updateProgress(100);
    uploadState(false);
    const url = await firebase
      .storage()
      .ref("images")
      .child(fileName)
      .getDownloadURL();
    changeAvatarUrl(url);

    console.log(url);
  };

  return (
    <div className='pageDiv'>
      {isUploading && <p>Progress: {progress}</p>}
      {avatarUrl && <img alt='jsx-a11y/alt-text' src={avatarUrl} />}
      <label style={{backgroundColor: 'steelblue', color: 'white',marginTop:40,marginLeft:5, padding: 10, borderRadius: 20, pointer: 'cursor'}}>
     
      <FileUploader
        accept='image/*'
        name='avatar'
        randomizeFilename
        storageRef={firebase.storage().ref("images")}
        onUploadStart={handleUploadStart}
        onUploadError={handleUploadError}
        onUploadSuccess={handleUploadSuccess}
        onProgress={handleProgress}
      />
      </label>
    </div>
  );
}

export default Page;
