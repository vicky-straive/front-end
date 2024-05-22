import React, { forwardRef, } from 'react';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import './panel.css'

  const  GroupDemo = forwardRef((props, ref) => {
    const items = [
        {
            label: 'Profile',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog'
                },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => {
            sessionStorage.setItem("token", null);
            window.location.href = "/sme_review";
          },
        },
            ]
        }
    ];

    return (
        <div  ref={ref} className="card flex justify-content-center profile_panel">
            <Menu model={items} />
        </div>
    )
});

export default GroupDemo;