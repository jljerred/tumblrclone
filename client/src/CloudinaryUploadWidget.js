//CLOUDINARY WIDGET USED TO UPLOAD MEDIA POSTS
import React from "react";
import { FaPhotoVideo } from "react-icons/fa";
import styled from "styled-components";

const CloudinaryUploadWidget = ({ setMedia, media }) => {
  const cloudName = "dd9k8eh1n";
  const uploadPreset = "jwtcwule";

  let myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        document
          .getElementById("uploadedimage")
          .setAttribute("src", result.info.secure_url);
        setMedia([
          ...media,
          {
            type: result.info.resource_type,
            src: result.info.secure_url,
          },
        ]);
      }
    }
  );

  return (
    <Button
      id="upload_widget"
      className="cloudinary-button"
      onClick={() => {
        myWidget.open();
      }}
    >
      <FaPhotoVideo />
    </Button>
  );
};

const Button = styled.button``;
export default CloudinaryUploadWidget;
