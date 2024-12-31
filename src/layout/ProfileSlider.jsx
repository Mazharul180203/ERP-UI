import React from 'react';
import { Avatar, Button } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {BASE_URL} from "../../../config/config.js";
import axios from "axios";

const ProfileSlider = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar size="large" icon={<UserOutlined/>} style={{marginRight: '10px'}}/>
            <Button type="primary" icon={<LogoutOutlined/>} style={{marginRight: '10px'}}>
                <a onClick={async ()=>{
                    let res = await axios.post(`${BASE_URL}/api/v1/AuthDestroy`,{withCredentials:true})
                    if(res.data['status']==='success'){
                        console.log("ok")
                        window.location.reload();
                    }
                }}>Logout</a>
            </Button>
        </div>
    );
}

export default ProfileSlider;