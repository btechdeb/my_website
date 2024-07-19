import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
//import '../css/adminDashboard.css';
import '../css/Assets.css'
import TopNav from '../pages/TopNav'; // Assuming TopNav.jsx is in the same directory
import axios from 'axios';
const UserDashboard = () => {
  const location = useLocation();
  const employeeData = location.state || { user: { employeeName: 'Unknown' } };
  console.log(employeeData);
  const user = employeeData.user;
  const [employees, setEmployees] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const itemsPerPage = 10;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    axios.get('http://localhost:3000/emplist')
      .then(response => {
        const data = response.data.data;
        console.log(data);

        // Filter the data where the employee name matches
        const filteredData = data.filter(emp => emp["Employee Name"] === user["Employee Name"]);
        console.log(filteredData);
        setEmployees(filteredData);

        if (filteredData.length > 0) {
          setHeaders(Object.keys(filteredData[0]));
        }
      })
      .catch(error => {
        console.error("There was an error fetching the employee list!", error);
      });
  }, [employeeData.user.employeeName]);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredEmployees = employees.filter(employee =>
    headers.some(header => {
      const value = employee[header];
      return value && value.toString().toLowerCase().includes(searchKeyword.toLowerCase());
    })
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage === 1 ? 1 : prevPage - 1));
  };

  const convertToCSV = (array) => {
    const filteredHeaders = headers.filter(header => header !== '_id');
    const header = filteredHeaders.join(',');
    const rows = array.map(row => 
      filteredHeaders.map(header => `"${row[header] || ''}"`).join(',')
    );
    return [header, ...rows].join('\n');
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(employees);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'employees.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="user-dashboard">
      <TopNav employeeData={employeeData} />
      <h1 style={{ padding: '100px 0 0 150px' }}>Welcome {user["Employee Name"]}. You have <span style={{ color: "grey"}}>{capitalizeFirstLetter(user["Role"])}</span> level access</h1>

      <div className="container" style={{ width: "80%", paddingLeft: '100px'}}>
        <h2 className="text-4xl font-bold mb-6" style={{ fontSize: '2em' }}>Your Assets</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="table-container">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header === '_id' ? "" : header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header, colIndex) => (
                      <td key={colIndex}>
                        {header === '_id' ? ('') : employee[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination-controls-container">
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev Page</button>
            <button onClick={handleNextPage} disabled={indexOfLastItem >= filteredEmployees.length}>Next Page</button>
          </div>
          {/* {<button onClick={downloadCSV} className="download-button">Download CSV</button>} */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;