import React, { useState, useEffect } from 'react';
import './tabs.css';

export const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    useEffect(() => {
        setActiveTab(tabs[0].id);
    }, [tabs]);

    const renderContent = () => {
        const activeTabContent = tabs.find(tab => tab.id === activeTab);
        return activeTabContent ? <div>{activeTabContent.content}</div> : null;
    };

    return (
        <>
            <div className='container-xl px-4 mt-n10'>
                <div className="card mb-4">
                    <div className="card-header">
                        <nav className="nav nav-borders">
                            {tabs.map(tab => (
                                <a
                                    key={tab.id}
                                    className={`nav-link cursor-tabs ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};