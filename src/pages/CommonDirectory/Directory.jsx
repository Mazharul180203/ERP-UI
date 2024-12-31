import React, {useEffect} from 'react';
import { NavLink} from "react-router-dom";

const Directory = ({pages}) => {
    return (
            <div className="container-fluid">
                <div className="row justify-content-start mt-4">
                    {pages.map((item, idx) => (
                        <div className="col-sm-4 col-md-2 mb-4" key={idx}>
                            <NavLink
                                to={item.to}
                                className={({isActive}) => `box ${isActive ? 'active' : ''}`}
                            >
                                {item.text}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default Directory;