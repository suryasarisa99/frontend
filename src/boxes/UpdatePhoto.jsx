import ReactDOM from "react-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { useContext, useEffect } from "react";
import RegisterContext from "../../context/registerId";
import axios from "axios";
import { motion } from "framer-motion";
export default function UpdatePhoto() {
  let {
    closeUpdatePhoto,
    submitUpdatePhoto,
    setImgUrl,
    imgUrl,
    setData,
    server,
    updatePhoto,
    data,
  } = useContext(RegisterContext);
  useEffect(() => {
    document.querySelector(".update-photo input").focus();
    window.addEventListener("popstate", closeUpdatePhoto);
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        closeUpdatePhoto();
      }
    });
    return () => {
      window.removeEventListener("popstate", closeUpdatePhoto);
    };
  }, []);
  function imageLoad(e) {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImgUrl(event.target.result);
        data.photo = "inserted-photo-just-now";
      };
      console.log("img -- worked");
      reader.readAsDataURL(file);
    }
  }
  function removePhoto() {
    setData((prvData) => {
      return { ...prvData, photo: "" };
    });
    setImgUrl(false);
    closeUpdatePhoto();
    axios.delete(`${server}/photo/${data._id}`).then((res) => console.log(res));
  }
  return ReactDOM.createPortal(
    <>
      <motion.form
        initial={{ y: -180, x: -205 }}
        animate={{ y: updatePhoto ? 0 : -180 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="update-photo"
        encType="multipart/form-data"
        onSubmit={submitUpdatePhoto}
        method="POST"
      >
        <label htmlFor="">Add Photo</label>
        <GiCrossedSwords className="close-btn" onClick={closeUpdatePhoto} />
        <input type="file" name="photo" accept="image/*" onChange={imageLoad} />
        <div className="buttons">
          <button className="secondary" type="button" onClick={removePhoto}>
            Delete
          </button>
          <button>Submit</button>
        </div>
      </motion.form>
    </>,
    document.getElementById("root")
  );
}
