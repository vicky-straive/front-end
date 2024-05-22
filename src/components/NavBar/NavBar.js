
import React, { useEffect, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import './nav.css'
import ProfilePanel from "../Panel/ProfilePanel"

export default function TemplateDemo() {
    const profilePanelRef = useRef(null);

    const [showProfilePanel, setShowProfilePanel] = React.useState(false);

    
const toggleProfilePanel = () => {
    setShowProfilePanel(!showProfilePanel);
}
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/sme_review/job_details'
        },
        // {
        //     label: 'Features',
        //     icon: 'pi pi-star'
        // },
        // {
        //     label: 'Projects',
        //     icon: 'pi pi-search',
        //     items: [
        //         {
        //             label: 'Core',
        //             icon: 'pi pi-bolt',
        //             shortcut: '⌘+S',
        //             template: itemRenderer
        //         },
        //         {
        //             label: 'Blocks',
        //             icon: 'pi pi-server',
        //             shortcut: '⌘+B',
        //             template: itemRenderer
        //         },
        //         {
        //             label: 'UI Kit',
        //             icon: 'pi pi-pencil',
        //             shortcut: '⌘+U',
        //             template: itemRenderer
        //         },
        //         {
        //             separator: true
        //         },
        //         {
        //             label: 'Templates',
        //             icon: 'pi pi-palette',
        //             items: [
        //                 {
        //                     label: 'Apollo',
        //                     icon: 'pi pi-palette',
        //                     badge: 2,
        //                     template: itemRenderer
        //                 },
        //                 {
        //                     label: 'Ultima',
        //                     icon: 'pi pi-palette',
        //                     badge: 3,
        //                     template: itemRenderer
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     label: 'Contact',
        //     icon: 'pi pi-envelope',
        //     badge: 2,
        //     template: itemRenderer
        // }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profilePanelRef.current && !profilePanelRef.current.contains(event.target)) {
                setShowProfilePanel(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
        {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" onClick={toggleProfilePanel} />
       {showProfilePanel && <ProfilePanel ref={profilePanelRef} />}
    </div>
    );
    const profile = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Refresh',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Export',
                    icon: 'pi pi-upload'
                }
            ]
        }
    ];

    return (
        <div className="card">
            <Menubar className='nav-container' model={items} start={start} end={end} />
        </div>
    )
}
        