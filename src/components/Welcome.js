import React from 'react'
import { useNavigate } from 'react-router-dom';
// create a table with three rows and mention them as Name Age and Gender
      // create a button to logout
      // create a button to go back to login page   
      // create a button to go back to prime table page
      // create a button to go back to dashboard page
      

function Welcome() {
  const logout = () => {
    // Clear user authentication tokens or session data
    // For example, you can use localStorage or sessionStorage to store authentication tokens
    localStorage.removeItem('accessToken');
    
    // Redirect the user to the login page
    window.location.href = '/login';
  }

  const goToLoginPage = () => {
    // go to login page logic here
    console.log("Going to login page");
    }

const navigate = useNavigate();

const goToNewPage = () => {
  // go to new page logic here
  console.log("Going to new page");
  navigate('/prime-table');
}

      const goToDashboardPage = () => {
    // go to dashboard page logic here
    console.log("Going to dashboard page");
    }
  

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
        <tr>
          <td>John Doe</td>
          <td>25</td>
          <td>Male</td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>30</td>
          <td>Female</td>
        </tr>
      </table>

      <button className="custom-button" onClick={logout}>Logout</button>
      <button className="custom-button" onClick={goToLoginPage}>Go back to login page</button>
      <button className="custom-button" onClick={goToNewPage}>Go back to prime table page</button>
      <button className="custom-button" onClick={goToDashboardPage}>Go back to dashboard page</button>
      
    </div>
  )
}

export default Welcome
