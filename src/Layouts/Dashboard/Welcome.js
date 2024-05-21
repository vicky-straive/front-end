import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';

function Welcome() {
  const toast = useRef(null);

  const showSuccess = (name) => {
    toast.current.show({
      severity: 'success',
      summary: 'Login Success',
      detail: `Welcome ${name}`,
      life: 3000,
    });
  };

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {/* <button onClick={() => showSuccess('John Doe')}>Show Toast</button> */}
      {/* <Toast ref={toast} /> */}
    </div>
  );
}

export default Welcome;
