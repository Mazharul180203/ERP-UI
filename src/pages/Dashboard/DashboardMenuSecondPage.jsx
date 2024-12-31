import React, {useState} from 'react';
import {Button} from "antd";
import {HomeOutlined} from "@ant-design/icons";

const DashboardMenuSecondPage = () => {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleClick = (boxNumber) => {
        setSelectedBox(boxNumber);
    };
    return (
        <div className="container-fluid">
            <div className="row justify-content-start mt-4">
            <div className="col-sm-4 col-md-3 mb-4">
                <Button style={{height: '90px'}}
                        className={`box ${selectedBox === 1 ? 'selected' : ''}`}
                        onClick={() => handleClick(1)}
                        icon={<HomeOutlined style={{fontSize: '24px'}}/>}
                >
                    <span className="bold-text">Box 1</span>

                </Button>
            </div>
            <div className="col-sm-4 col-md-3 mb-4">
                <Button style={{height: '90px'}}
                        className={`box ${selectedBox === 2 ? 'selected' : ''}`}
                        onClick={() => handleClick(2)}
                        icon={<HomeOutlined style={{fontSize: '24px'}}/>}
                >
                    <span className="bold-text">Box 2</span>
                </Button>
            </div>
            <div className="col-sm-4 col-md-3 mb-4">
                <Button style={{height: '90px'}}
                        className={`box ${selectedBox === 3 ? 'selected' : ''}`}
                        onClick={() => handleClick(3)}
                        icon={<HomeOutlined style={{fontSize: '24px'}}/>}

                >
                    <span className="bold-text">Box 3</span>
                </Button>
            </div>
            <div className=" col-sm-4 col-md-3 mb-4">
                <Button style={{height: '90px'}}
                        className={`box ${selectedBox === 5 ? 'selected' : ''}`}
                        onClick={() => handleClick(5)}
                        icon={<HomeOutlined style={{fontSize: '24px'}}/>}
                >
                    <span className="bold-text">Box 4</span>
                </Button>
            </div>
        </div>
        </div>

    );
};

export default DashboardMenuSecondPage;