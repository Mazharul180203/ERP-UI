import React, {useState} from 'react';
import Directory from "../CommonDirectory/Directory.jsx";


const DashboardMenuFirstPage = () => {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleClick = (boxNumber) => {
        setSelectedBox(boxNumber);
    };
    let data = [
        {
            to:'/',
            text:"Purchase Menu"
        },
        {
            to:'/',
            text:"Supply Payment"
        },
        {
            to:'/',
            text:"Stock Menu"
        },
        {
            to:'/',
            text:"Customer Collection"
        },
        {
            to:'/',
            text:"Expenditure"
        },
        {
            to:'/',
            text:"Daily sheet"
        },
    ]
    return (
        <Directory pages={data}/>
    );
};

export default DashboardMenuFirstPage;