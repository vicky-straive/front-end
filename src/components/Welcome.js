import { Button } from 'primereact/button';
import React from 'react'
import { useNavigate } from 'react-router-dom';
// create a table with three rows and mention them as Name Age and Gender
      // create a button to logout
      // create a button to go back to login page   
      // create a button to go back to prime table page
      // create a button to go back to dashboard page
      

function Welcome() {
// create a sum of 3 and multipy with 5
    const sum = 3 + 5;
    const product = sum * 5;
    console.log(product);
    

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
  navigate('/login');

  // navigate('/prime-table');
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

      <h1>Welcome to the dashboard</h1>
            <p>This is the dashboard page</p>
            <p>The sum of 3 and 5 is {sum}</p>
            <p>The product of 3 and 5 is {product}</p>

      <Button className="custom-button" onClick={logout}>Logout</Button>
      <button className="custom-button" onClick={goToLoginPage}>Go back to login page</button>
      <button className="custom-button" onClick={goToNewPage}>Go back to prime table page</button>
      <button className="custom-button" onClick={goToDashboardPage}>Go back to dashboard page</button>
      
    </div>
  )
}

export default Welcome
