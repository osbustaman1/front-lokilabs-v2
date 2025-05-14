import React, { useState } from 'react';
import './VerticalTabs.css';

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

export const VerticalTabs = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(0);



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
