import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Assets.css';
import TopNav from './TopNav';

const Assets = () => {
  const location = useLocation();
  const employeeData = location.state || {};
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFullTable, setShowFullTable] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [editFormData, setEditFormData] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page on search input change
  }, [searchInput]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/items');
      const data = await response.json();
      setData(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changeItemsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const nextPage = () => {
    if (currentPage * itemsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = useCallback(
    () => {
      const filter = searchInput.toUpperCase();
      return data.filter(item =>
        Object.values(item).some(value =>
          String(value).toUpperCase().includes(filter)
        )
      );
    },
    [data, searchInput]
  )();

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openForm = () => {
    document.getElementById("addDataForm").style.display = "block";
  };

  const closeForm = () => {
    document.getElementById("addDataForm").style.display = "none";
  };

  const openFieldForm = () => {
    document.getElementById("addFieldForm").style.display = "block";
  };

  const closeFieldForm = () => {
    document.getElementById("addFieldForm").style.display = "none";
  };

  const openDeleteFieldForm = () => {
    document.getElementById("deleteFieldForm").style.display = "block";
  };

  const closeDeleteFieldForm = () => {
    document.getElementById("deleteFieldForm").style.display = "none";
  };

  const toggleColumns = () => {
    setShowFullTable(!showFullTable);
    const extraColumns = document.querySelectorAll(".extra-column");

    extraColumns.forEach(column => {
      column.style.display = showFullTable ? "table-cell" : "none";
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/delete_asset/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = data.filter(item => item._id !== id);
        setData(updatedData);
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const addField = async (e) => {
    e.preventDefault();

    const fieldName = document.getElementById('fieldName').value;
    const fieldType = document.getElementById('fieldType').value;

    try {
      const response = await fetch('http://localhost:3000/addField', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fieldName, fieldType }),
      });

      if (response.ok) {
        closeFieldForm();
        fetchData(); // Refresh data to show the new field
      } else {
        console.error('Failed to add field');
      }
    } catch (error) {
      console.error('Error adding field:', error);
    }
  };

  const addData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newData = {};

    formData.forEach((value, key) => {
      newData[key] = value;
    });

    try {
      const response = await fetch('http://localhost:3000/add_asset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        // Reset the form after successful submission
        document.getElementById('dataForm').reset();
        closeForm();
        fetchData(); // Refresh data to show the new item
      } else {
        console.error('Failed to add data');
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const openEditForm = (item) => {
    if (window.confirm('Are you sure you want to edit this item?')) {
      setEditFormData(item);
      document.getElementById("editDataForm").style.display = "block";
    }
  };

  const closeEditForm = () => {
    setEditFormData(null);
    document.getElementById("editDataForm").style.display = "none";
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedItem = {};
    formData.forEach((value, key) => {
      updatedItem[key] = value; // Include all fields, even empty ones
    });

    try {
      const response = await fetch(`http://localhost:3000/edit_asset/${editFormData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        setSuccessMessage('Edited successfully');
        closeEditForm();
        fetchData(); // Refresh data to show the updated item
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setTimeout(() => setSuccessMessage(''), 3000); // Clear the success message after 3 seconds
    }
  };

  const deleteField = async (e) => {
  e.preventDefault();

  // Get all checked fields to delete
  const formData = new FormData(e.target);
  const fieldsToDelete = [];
  formData.forEach((value, key) => {
    if (value === "on") {
      fieldsToDelete.push(key);
    }
  });

  // Log the fields to delete for debugging purposes
  console.log('Fields to delete:', fieldsToDelete);

  try {
    const response = await fetch('http://localhost:3000/deleteField', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: fieldsToDelete }),
    });

    if (response.ok) {
      closeDeleteFieldForm();
      fetchData(); // Refresh data to show the updated fields
    } else {
      const errorData = await response.json();
      console.error('Failed to delete fields:', errorData.message);
    }
  } catch (error) {
    console.error('Error deleting fields:', error);
  }
};

const downloadScrapedAssets = () => {
  const scrapedAssets = data.filter(item => item.Scraped === "Yes");

  const csvContent = [
    Object.keys(scrapedAssets[0]).filter(key => key !== "pswd" && key !== "_id").join(","),
    ...scrapedAssets.map(item =>
      Object.values(item)
        .filter((_, index) => Object.keys(item)[index] !== "pswd")
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "scraped_assets.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const convertToCSV = (array) => {
  const filteredHeaders = data.filter(header => header !== '_id' && header !== "pswd");
  const header = filteredHeaders.join(',');
  const rows = array.map(row => 
    filteredHeaders.map(header => `"${row[header] || ''}"`).join(',')
  );
  return [header, ...rows].join('\n');
};
const downloadCSV = async () => {
  try {
    console.log('Requesting CSV download...');
    const response = await fetch('http://localhost:3000/download_csv', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/csv',
      },
    });
    if (!response.ok) {
      console.error('Network response was not ok:', response);
      throw new Error('Network response was not ok');
    }
    console.log('CSV download response received, processing...');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data_uml.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('CSV file downloaded successfully.');
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
};
  return (
    <div className="report-page">
      <TopNav employeeData={employeeData} />
      <div className="content gen-report-content">
        <div className="table-container">
          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Items per page:</label>
            <select id="itemsPerPage" onChange={changeItemsPerPage} value={itemsPerPage}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>

          <input type="text" id="searchInput" placeholder="Search..." value={searchInput} onChange={handleSearchInputChange} />

          <button id="addDataBtn" onClick={openForm}>Add Data</button>
          <button id="addFieldBtn" onClick={openFieldForm}>Add Field</button>
          <button id="deleteFieldBtn" onClick={openDeleteFieldForm}>Delete Field</button>
          <button id="downloadScrapList"onClick={downloadScrapedAssets}>Download Scraped Assets List</button>
          <button id="toggleColumnsBtn" onClick={toggleColumns}>Toggle Columns</button>
          <button id="downloadButton"onClick={downloadCSV} >Download CSV</button>
          <div id="addDataForm" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeForm}>&times;</span>
              <h2>Add New Data</h2>
              <form id="dataForm" onSubmit={addData}>
                {data.length > 0 && Object.keys(data[0]).map((key) => (
                  key !== '_id' && key !== "pswd" && (
                    <div key={key}>
                      <label htmlFor={key}>{key}:</label>
                      <input type="text" id={key} name={key} /><br />
                    </div>
                  )
                ))}
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>

          <div id="addFieldForm" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeFieldForm}>&times;</span>
              <h2>Add New Field</h2>
              <form id="fieldForm" onSubmit={addField}>
                <label htmlFor="fieldName">Field name:</label>
                <input type="text" id="fieldName" name="fieldName" required /><br />
                <label htmlFor="fieldType">Field type:</label>
                <select id="fieldType" name="fieldType" required>
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Boolean">Boolean</option>
                </select><br />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>

          <div id="deleteFieldForm" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeDeleteFieldForm}>&times;</span>
              <h2>Delete Field</h2>
              <form id="deleteFieldForm" onSubmit={deleteField}>
                {data.length > 0 && Object.keys(data[0]).map((key) => (
                  key !== '_id' && key !== "pswd" && (
                    <div key={key}>
                      <input type="checkbox" id={key} name={key} />
                      <label htmlFor={key}>{key}</label><br />
                    </div>
                  )
                ))}
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>

          <div id="editDataForm" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeEditForm}>&times;</span>
              <h2>Edit Data</h2>
              {editMessage && <p>{editMessage}</p>}
              <form id="editForm" onSubmit={handleEditSubmit}>
                {editFormData &&
                  Object.keys(editFormData).map((key) => (
                    key !== '_id' && key !== "pswd" && (
                      <div key={key}>
                        <label htmlFor={key}>{key}:</label>
                        <input
                          type="text"
                          id={key}
                          name={key}
                          defaultValue={editFormData[key]}
                        /><br />
                      </div>
                    )
                  ))}
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}

          <table id="employeeTable">
            <thead>
              <tr>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key, index) => (
                    key !== '_id' && key !== "pswd" && (
                      <th key={key} className={index > 8 ? 'extra-column' : ''}>{key}</th>
                    )
                  ))}
                <th className="extra-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, rowIndex) => (
                <tr key={item._id}>
                  {Object.keys(item).map((key, colIndex) => (
                    key !== '_id' && key !== "pswd" && (
                      <td key={`${item._id}-${key}`} className={colIndex > 8 ? 'extra-column' : ''}>{item[key]}</td>
                    )
                  ))}
                  <td className="extra-column">
                    <button className="edit-link" onClick={() => openEditForm(item)}>Edit</button>
                    <button className="delete-link" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button id="prevPageBtn" onClick={prevPage}>Previous Page</button>
            <button id="nextPageBtn" onClick={nextPage}>Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assets;
