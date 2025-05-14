import React from 'react'
import { Link } from 'react-router-dom';

export const SmallIamge = ({ data }) => {
    return (
        <>
            <Link to={data.url} className="d-flex align-items-center text-decoration-none text-body">
                <img 
                    className="img-fluid rounded-circle"
                    src={data.url}
                    alt={data.alt}
                    style={{ width: '30px', height: '30px' }}
                />
            </Link>
        </>
    )
}

export const SmallIamgeWithData = ({ data }) => {
    return (
        <>
            <Link to={data.url} className="d-flex align-items-center text-decoration-none text-body">

                <img
                    className="img-fluid rounded-circle"
                    src={data.url_image}
                    alt={data.alt}
                    style={{ width: '30px', height: '30px' }}
                />
                <div className="ms-2">
                    <div className="fw-bold">{data.name}</div>
                    <div className="text-muted"><small>{data.rut}</small></div>
                </div>
            </Link>
        </>
    );
}