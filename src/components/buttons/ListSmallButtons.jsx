import React from 'react';
import { Link } from "react-router-dom";

export const ListSmallButtons = ({ buttons = [] }) => {
    return (
        <div className="d-flex">
            {buttons.map((key, index) => (
                <div key={index} className="me-2">
                    {key.url ? (
                        <Link 
                            className={key.list_items ? "btn btn-primary dropdown-toggle" : "btn btn-primary"} 
                            id={`dropdownFadeIn-${index}`} 
                            type="button"
                            data-bs-toggle={key.list_items ? "dropdown" : undefined} 
                            aria-haspopup={key.list_items ? "true" : undefined} 
                            aria-expanded={key.list_items ? "false" : undefined}
                            to={key.url}
                        >
                            {key.label} <i className={key.list_items ? '' : `${key.icon}`} style={{ marginLeft: '10px' }}></i>
                        </Link>
                    ) : (
                        <button 
                            className={key.list_items ? "btn btn-primary dropdown-toggle" : "btn btn-primary"} 
                            id={`dropdownFadeIn-${index}`} 
                            type="button"
                            data-bs-toggle={key.list_items ? "dropdown" : undefined} 
                            aria-haspopup={key.list_items ? "true" : undefined} 
                            aria-expanded={key.list_items ? "false" : undefined}
                            onClick={typeof key.onClick === 'function' ? key.onClick : undefined}
                        >
                            {key.label} <i className={key.list_items ? '' : `${key.icon}`} style={{ marginLeft: '10px' }}></i>
                        </button>
                    )}
                    {key.list_items && (
                        <div className="dropdown-menu animated--fade-in" aria-labelledby={`dropdownFadeIn-${index}`}>
                            {key.list_items.map((item, index) => (
                                item.url ? (
                                    <Link key={index} className="dropdown-item" onClick={typeof item.onClick === 'function' ? item.onClick : undefined} to={item.url}>
                                        <small>{item.label}</small>
                                    </Link>
                                ) : (
                                    <button key={index} className="dropdown-item" onClick={typeof item.onClick === 'function' ? item.onClick : undefined} type="button">
                                        <small>{item.label}</small>
                                    </button>
                                )
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};