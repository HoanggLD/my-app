import React, { useState, useEffect } from 'react';
import './UpdatePost.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Adds } from '../../../Authorization/Api';
import { Select, Form, Input, Button, Spin } from 'antd';

interface PostData {
    title: string;
    summary: string;
    content: string;
    status: number;
    ownerId: number;
}

interface OwnerData {
    id: number;
    name: string;
}

const UpdatePost: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [mess, setMess] = useState('');
    const [formData, setFormData] = useState<PostData>({
        title: '',
        summary: '',
        content: '',
        status: 0,
        ownerId: 0
    });
    const [idNamePairs, setIdNamePairs] = useState<OwnerData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/posts/${id}`);
                const postData: PostData = response.data;
                setFormData(postData);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
            }
        };

        fetchData();

        const idNamePairsString = localStorage.getItem('idNamePairs');
        if (idNamePairsString) {
            setIdNamePairs(JSON.parse(idNamePairsString));
        }
    }, [id]);

    const handleChange = (value: string) => {
        setFormData((prevFormData) => ({ ...prevFormData, ownerId: parseInt(value) }));
    };

    const onFinish = async (values: any) => {
        try {
            const { title, summary, status, content } = values;
            const postData = { title, summary, status: parseInt(status), content, ownerId: formData.ownerId };
            const res = await axios.put(`${Adds}/${id}`, postData);
            console.log(res);
            setMess('Cập nhật thành công. Chuyển trang sau 2s.');
            setTimeout(() => {
                navigate('/list');
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            setMess('Có lỗi xảy ra khi cập nhật sản phẩm.');
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            <h2 className='titles'>Cập nhật</h2>
            <div className="form-container">
                <Form
                    name="updatePostForm"
                    initialValues={formData}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    onFinish={onFinish}
                    className='forms'
                >
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input your title!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Summary" name="summary" rules={[{ required: true, message: 'Please input your summary!' }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please input your content!' }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please input your status!' }]}>
                        <Input type="number" />
                    </Form.Item>

                    {idNamePairs.length > 0 && (
                        <Form.Item label="Owner ID">
                            <Select
                                style={{ width: 170 }}
                                onChange={handleChange}
                                defaultValue={formData.ownerId.toString()}
                            >
                                {idNamePairs.map(({ id, name }) => (
                                    <Select.Option key={id} value={id.toString()}>{id} - {name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button type="primary" className='butons' htmlType="submit">Cập nhật</Button>
                    </Form.Item>
                    {mess && <div className='messa'>    <Spin size="large" /></div>}
                </Form>
            </div>
        </div>
    );
};

export default UpdatePost;
