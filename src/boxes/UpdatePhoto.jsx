import ReactDOM from "react-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { useContext, useEffect } from "react";
import RegisterContext from "../../context/registerId";
import axios from "axios";
export default function UpdatePhoto() {
  let {
    closeUpdatePhoto,
    submitUpdatePhoto,
    setImgUrl,
    imgUrl,
    setData,
    server,
    data,
  } = useContext(RegisterContext);
  useEffect(() => {
    window.addEventListener("popstate", closeUpdatePhoto);
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
      <form
        className="update-photo"
        encType="multipart/form-data"
        onSubmit={submitUpdatePhoto}
        method="POST"
      >
        <label htmlFor="">Add Photo</label>
        <GiCrossedSwords
          fill="red"
          className="close-btn"
          onClick={closeUpdatePhoto}
        />
        <input type="file" name="photo" accept="image/*" onChange={imageLoad} />
        <div className="buttons">
          <button className="secondary" type="button" onClick={removePhoto}>
            Delete
          </button>
          <button>Submit</button>
        </div>
      </form>
    </>,
    document.getElementById("root")
  );
}
