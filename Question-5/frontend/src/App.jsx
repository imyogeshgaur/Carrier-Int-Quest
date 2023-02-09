import { useState } from 'react'
import './App.css'
import NavBar from './NavBar'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [file, setfile] = useState("")
  const uploadFile = async () => {
    try {
      if (!file) {
        const a = toast.error("Please Choose a file !!!", {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "red",
            backgroundColor: "rgb(255, 206, 206)"
          }
        })
        if (a == 1) {
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      } else {
        const formData = new FormData();
        formData.append("file", file)
        console.log(file)
        const res = await fetch("http://localhost:2000/upload", {
          mode: 'cors',
          method: 'POST',
          body: formData
        })
        const data = await res.json()
        const a = toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "green",
            backgroundColor: "rgb(183, 248, 183)"
          }
        })
        if (a == 1) {
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error)
      const a = toast.error("Network Error !!!", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "red",
          backgroundColor: "rgb(255, 206, 206)"
        }
      })
      if (a == 1) {
        setTimeout(() => {
          // window.location.reload()
        }, 2000);
      }
    }
  }

  return (
    <>
      <NavBar />
      <ToastContainer autoClose={1000} />
      <div className="card mx-auto mt-5 bg-primary" style={{ width: "28rem" }}>
        <div className="card-body text-center">
          <h5 className="card-title text-white">Upload File</h5>
          <div class="my-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setfile(e.target.files[0])}
            />
          </div>
        </div>
        <button
          className="btn btn-secondary mx-auto w-50 mb-3"
          onClick={uploadFile}>
          Upload
        </button>
      </div>
    </>
  )
}

export default App
