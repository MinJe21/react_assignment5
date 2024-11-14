import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

const ShowList = () => {
  const [phoneData, setPhoneData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    phone_name: "",
    company: "",
    price: "",
    capacity: ""
  });

  useEffect(() => {
    getDataFromJSONFile();
  }, []);

  const getDataFromJSONFile = () => {
    axios
      .get("https://672818a9270bd0b975544f0f.mockapi.io/api/v1/phone")
      .then((response) => setPhoneData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const createDataToJSONFile = () => {
    axios.post("https://672818a9270bd0b975544f0f.mockapi.io/api/v1/phone", {
      id: formData.id,
      phone_name: formData.phone_name,
      company: formData.company,
      price: formData.price,
      capacity: formData.capacity
    })
    .then((response) => {
      if (response.status === 201) {
        alert("등록 성공!");
        getDataFromJSONFile();
      }
    })
    .catch((error) => console.error("Error creating data:", error));
  };

  const updateDataToJSONFile = () => {
    if (!formData.id) {
      alert("ID를 입력하세요.");
      return;
    }

    axios
      .put(`https://672818a9270bd0b975544f0f.mockapi.io/api/v1/phone/${formData.id}`, {
        phone_name: formData.phone_name,
        company: formData.company,
        price: formData.price,
        capacity: formData.capacity
      })
      .then((response) => {
        if (response.status === 200) {
          alert("수정 성공!");
          getDataFromJSONFile();
        }
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const deleteDataToJSONFile = () => {
    if (!formData.id) {
      alert("ID를 입력하세요.");
      return;
    }

    axios
      .delete(`https://672818a9270bd0b975544f0f.mockapi.io/api/v1/phone/${formData.id}`)
      .then((response) => {
        if (response.status === 200) {
          alert("삭제 성공!");
          getDataFromJSONFile();
        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        alert("삭제 실패");
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="container">
      <h3 className="mt-3">Phone Data List</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Phone Name</th>
            <th>Company</th>
            <th>Price</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {phoneData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.phone_name}</td>
              <td>{item.company}</td>
              <td>{item.price}</td>
              <td>{item.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "30px" }}>
        <h5>Manage Phone Data</h5>
        
        <button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#createDataModal">
          Create DATA
        </button>

        <div className="modal fade" id="createDataModal" tabIndex="-1" aria-labelledby="createDataModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="createDataModalLabel">Create Data</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label htmlFor="phone_name" className="form-label">Phone Name</label>
                <input type="text" id="phone_name" className="form-control" style={{ width: "70%" }} value={formData.phone_name} onChange={handleInputChange} />

                <label htmlFor="company" className="form-label">Company</label>
                <input type="text" id="company" className="form-control" style={{ width: "70%" }} value={formData.company} onChange={handleInputChange} />

                <label htmlFor="price" className="form-label">Price</label>
                <input type="text" id="price" className="form-control" style={{ width: "70%" }} value={formData.price} onChange={handleInputChange} />

                <label htmlFor="capacity" className="form-label">Capacity</label>
                <input type="text" id="capacity" className="form-control" style={{ width: "70%" }} value={formData.capacity} onChange={handleInputChange} />
                데이터를 추가하시겠습니까?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={createDataToJSONFile}>Create Data</button>
              </div>
            </div>
          </div>
        </div>

        <button type="button" className="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#updateDataModal">
          Update DATA
        </button>

        <div className="modal fade" id="updateDataModal" tabIndex="-1" aria-labelledby="updateDataModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="updateDataModalLabel">Update Data</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label htmlFor="phone_name" className="form-label">Phone Name</label>
                <input type="text" id="phone_name" className="form-control" style={{ width: "70%" }} value={formData.phone_name} onChange={handleInputChange} />

                <label htmlFor="company" className="form-label">Company</label>
                <input type="text" id="company" className="form-control" style={{ width: "70%" }} value={formData.company} onChange={handleInputChange} />

                <label htmlFor="price" className="form-label">Price</label>
                <input type="text" id="price" className="form-control" style={{ width: "70%" }} value={formData.price} onChange={handleInputChange} />

                <label htmlFor="capacity" className="form-label">Capacity</label>
                <input type="text" id="capacity" className="form-control" style={{ width: "70%" }} value={formData.capacity} onChange={handleInputChange} />
                <label htmlFor="id" className="form-label">ID</label>
                <input type="text" id="id" className="form-control" style={{ width: "70%" }} value={formData.id} onChange={handleInputChange} />
                데이터를 수정하시겠습니까?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success" onClick={updateDataToJSONFile}>Update Data</button>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteDataModal">Delete Data</button>
        <div className="modal fade" id="deleteDataModal" tabIndex="-1" aria-labelledby="deleteDataModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteDataModalLabel">Delete Data</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label htmlFor="id" className="form-label">ID</label>
                <input type="text" id="id" className="form-control" style={{ width: "70%" }} value={formData.id} onChange={handleInputChange} />
                 데이터를 삭제하시겠습니까?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger" onClick={deleteDataToJSONFile}>Delete Data</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowList;
