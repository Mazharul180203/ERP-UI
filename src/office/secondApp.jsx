import  {useState} from 'react';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import NewTable from "./NewTable.jsx";
import EditTable from "./EditApp.jsx";


const initialData = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        role: 'admin',
    },
    {
        key: '2',
        name: 'saurav',
        age: 24,
        address: 'London No. 1 Lake Park',
        role: 'admin',
    },
    {
        key: '3',
        name: 'sasss',
        age: 32,
        address: 'New York No. 1 Lake Park',
        role: 'admin',
    },
    {
        key: '4',
        name: 'dfdf',
        age: 42,
        address: 'London No. 1 Lake Park',
        role: 'admin',
    },
];

const columnDefinitions = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        editable: true,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '10%',
        editable: true,
        sorter: (a, b) => a.age - b.age,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '15%',
        editable: true,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: '35%',
        editable: true,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
    },
];

const SecondApp = () => {

    return (
            <div className="row justify-content-start">

                <div>
                    {/*<NewTable/>*/}
                    <EditTable initialData={initialData} columnDefinitions={columnDefinitions}/>
                </div>
            </div>

    );
};

export default SecondApp;