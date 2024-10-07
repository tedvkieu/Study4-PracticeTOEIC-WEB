import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.scss';

const Breadcrumb = ({ items }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {items.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        {index < items.length - 1 ? (
                            <Link to={item.path}>{item.label}</Link>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
