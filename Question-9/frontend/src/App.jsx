import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import NavBar from './NavBar';

function App() {
  const [files, setfiles] = useState([])
  const [data, setdata] = useState([])
  useEffect(() => {
    fetch("http://localhost:2000/getFiles")
      .then(res => res.json())
      .then(data => setdata(data))
  }, [])

  const uploadFiles = async () => {
    try {
      if (files.length < 2) {
        const a = toast.success("Please Upload More Than 1 File", {
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
      } else {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i])
        }
        const res = await fetch("http://localhost:2000/upload", {
          mode: 'cors',
          method: 'POST',
          body: formData
        })
        const data = await res.json();
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
    }
  }
  return (
    <>
      <NavBar />
      <ToastContainer autoClose={1000} />
      <div className="card mx-auto mt-5" style={{ width: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Upload File Here</h5>
          <input type="file" className="form-control my-3" multiple={true} onChange={(e) => setfiles(e.target.files)} />
        </div>
        <button className="btn btn-primary mx-auto w-50 mb-3" onClick={uploadFiles}>Upload Files</button>
      </div>
      <table style={{ border: "1px solid black" }} className="mx-auto mt-5">
        <tr style={{ border: "1px solid black" }}>
          <th style={{ border: "1px solid black" }}>File Name</th>
          <th style={{ border: "1px solid black" }}>File Link</th>
          <th style={{ border: "1px solid black" }}>Upload DateTime</th>
        </tr>
        {
          data.map(val => {
            return (
              <>
                <tr style={{ border: "1px solid black" }}>
                  <td style={{ border: "1px solid black" }}>{val.file_name}</td>
                  <td style={{ border: "1px solid black" }}><a href={val.file_url}target="_blank">View File</a></td>
                  <td style={{ border: "1px solid black" }}>{val.upload_date_time}</td>
                </tr>
              </>
            )
          })
        }
      </table>
    </>
  )
}

export default App
