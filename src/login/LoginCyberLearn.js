import './LoginCyberLearn.scss';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import { Layout, Input } from 'antd';
const { Sider, Content } = Layout;



const LoginCyberLearn = () => {
    const [{width, height}, setSize] = useState({width: window.innerWidth, height: window.innerHeight});
    useEffect(()=>{
        const handleResize = ()=>{
            setSize({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener('resize', handleResize);

    //  return ()=>{
    //     window.removeEventListener('resize', handleResize);
    //  }

    },[])

    return (
        <Layout style={{ height: window.innerHeight }}>
            <Sider  width={width/2} >
                <img width={width/2} height={height} src={require('./hd.png')}/>
            </Sider>
            <Content className='content'>
                <Login />

            </Content>
        </Layout>
    );
};

export default LoginCyberLearn;