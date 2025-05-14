import React, { useState } from 'react';
import './HorizontalTabs.css';

const Tab = ({ label, isActive, onClick }) => (
    <button 
        className={`tab ${isActive ? 'active' : ''}`} 
        onClick={onClick}
    >
        {label}
    </button>
);

const TabContent = ({ children, isActive }) => (
    <div className={`tab-content ${isActive ? 'active' : ''}`}>
        {children}
    </div>
);

export const HorizontalTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: 'Tab 1', content: 'Contenido de la pestaña 1' },
        { label: 'Tab 2', content: 'Contenido de la pestaña 2' },
        { label: 'Tab 3', content: 'Contenido de la pestaña 3' }
    ];

    return (
        <div className="tabs-container">
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <Tab 
                        key={index} 
                        label={tab.label} 
                        isActive={index === activeTab} 
                        onClick={() => setActiveTab(index)} 
                    />
                ))}
            </div>
            <div className="tabs-content">
                {tabs.map((tab, index) => (
                    <TabContent key={index} isActive={index === activeTab}>
                        {tab.content}
                    </TabContent>
                ))}
            </div>
        </div>
    );
};