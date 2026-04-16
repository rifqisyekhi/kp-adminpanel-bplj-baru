import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./RunningText.css";
import { getAllRunningText, updateRunningText } from "../libs/runningText";

function RunningText() {
  const [formData, setFormData] = useState({ name: "" });
  const [runningTextData, setRunningTextData] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateRunningText(editId, {
        name: formData.name,
      });
      alert(
        response.success ? "Data successfully updated!" : "Update Data failed!"
      );
      console.log(response);
      setEditId(null);

      setFormData({ name: "" });
      fetchRunningTextData();
    } catch (error) {
      console.log("Error submitting the form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const fetchRunningTextData = async () => {
    try {
      const response = await getAllRunningText();
      setEditId(response.data[0].id);
      setFormData({ name: response.data[0].name });
      setRunningTextData(response.data || []);
    } catch (error) {
      console.error("Error fetching runningText data:", error);
    }
  };

  const handleEdit = (runningText) => {
    setEditId(runningText.id);
    setFormData({ name: runningText.name });
  };

  useEffect(() => {
    fetchRunningTextData();
  }, []);

  return (
    <div className="input-content">
      <div className="sch-container">
        <Sidebar activePage="running-text" />

        <main className="sch-main-content">
          <h1>Running Text</h1>
          <form onSubmit={handleSubmit}>
            <section>
              <h2>RunningText</h2>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <textarea
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="Masukkan nama runningText"
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <button type="submit">{editId ? "Update" : "Submit"}</button>
              </div>
            </section>
          </form>
        </main>
      </div>
    </div>
  );
}

export default RunningText;
