import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TopNav from './TopNav';
import '../css/ActivityLog.css'; // Make sure to create and import a CSS file for custom styles

const ActivityLog = () => {
  const location = useLocation();
  const employeeData = location.state || { user: { employeeName: 'Unknown' } };
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/activity_logs');
        setLogs(response.data);
        console.log('Fetched Logs:', response.data); // Log the fetched logs to check data
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const getActionDescription = (method, url, body, oldData) => {
    // if (method === 'POST' && url.includes('/add_asset')) {
    //   return {
    //     action: 'Data Added',
    //     data: body,
    //   };
    // }
    console.log(url);
    if (method === 'PUT' && url.includes('/edit_asset')) {
      const changedData = {};
      for (const key in body) {
        if (body[key] !== oldData[key]) {
          changedData[key] = {
            old: oldData[key],
            new: body[key]
          };
        }
      }
      return {
        action: 'Edit',
        data: changedData,
      };
    }
    // if (method === 'DELETE' && url.includes('/delete_asset')) {
    //   return {
    //     action: 'Delete',
    //     data: { id: url.split('/').pop() },
    //   };
    // }
    // if (method === 'POST' && url.includes('/addField')) {
    //   return {
    //     action: 'Field Added',
    //     data: body,
    //   };
    // }
    // if (method === 'POST' && url.includes('/deleteField')) {
    //   return {
    //     action: 'Field Deleted',
    //     data: body,
    //   };
    // }
    // return {
    //   action: method,
    //   data: body,
    // };
  };
  // const getActualChanges = (body, operation) => {
  //   const changedData = {};
  //   console.log(operation)
  // }
  // getActualChanges(logs.changes, logs.operation)
  const getEmployeeName = (body) => {
    return body?.employeeName || body?.['Employee Name'] || 'Unknown Employee';
  };

  return (
    <>
      <TopNav employeeData={employeeData}/>
      <div className="activity-log-container">
        <h2>Activity Log</h2>
        <table className="activity-log-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Employee Name</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => { 
              const oldData = log.oldData || {}; // Assuming oldData is included in the log entry
              const { changes, operation, fieldName, fieldType, fields } = log;
              const employeeName = getEmployeeName(log);
              
              return ( 
                <tr key={index}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{operation}</td>
                  <td>{operation === "delete_asset" || operation === "Add Field" || operation === "Delete Field"? "Check Data column":employeeName}</td>
                  <td>{operation === "Add Field" || operation === "Delete Field"? (<pre>{JSON.stringify(fieldName, null, 2)}<br/>
                  {JSON.stringify(fieldType, null, 2)} <br/>
                  {JSON.stringify(fields, null, 2)}
                  </pre>):(<pre>{JSON.stringify(changes, null, 2)}</pre>)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ActivityLog;
