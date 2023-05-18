import ReactDOM from "react-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { useContext, useEffect } from "react";
import RegisterContext from "../../context/registerId";

export default function UpdatePhoto() {
  let { closeUpdatePhoto, submitUpdatePhoto, setImgUrl, imgUrl } =
    useContext(RegisterContext);
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
      };
      console.log("img -- worked");
      reader.readAsDataURL(file);
    }
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
        <button>Submit</button>
      </form>
    </>,
    document.getElementById("root")
  );
}
