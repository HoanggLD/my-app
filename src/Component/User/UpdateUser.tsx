import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Spin } from 'antd';
import { UpdateUsers } from '../../Authorization/Api';

interface UserData {
    name: string;
    email: string;
    phone: string;
    status: number;
    password: string;
}

const UpdateUser: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [mess, setMess] = useState('');
    const [formData, setFormData] = useState<UserData>({
        name: '',
        email: '',
        phone: '',
        status: 0,
        password: ''
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/auth/${id}`);
                const userData: UserData = response.data;
                setFormData(userData);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
            }
        };

        fetchData();
    }, [id]);
    const onFinish = async (values: any) => {
        try {
            const { name, email, phone, status, password } = values;
            const userData = { name, email, phone, status: parseInt(status), password };
            const res = await axios.put(`${UpdateUsers}/${id}`, userData);
            setMess('Cập nhật thành công. Chuyển trang sau 2s.');
            console.log(res);
            setTimeout(() => {
                navigate('/user');
            }, 2000);
        } catch (error) {
            setMess('Có lỗi xảy ra khi cập nhật người dùng.');
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="content">
            <h2 className='titles'>Cập nhật Người Dùng</h2>
            <div className="form-container">
                <Form
                    name="updateUserForm"
                    initialValues={formData}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    onFinish={onFinish}
                    className='forms'
                >
                    <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}>
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" className='butons' htmlType="submit">Cập nhật</Button>
                    </Form.Item>
                    {mess && <div className='messa'>    <Spin size="large" /></div>}
                </Form>
            </div>
        </div>
    );
};
export default UpdateUser;
