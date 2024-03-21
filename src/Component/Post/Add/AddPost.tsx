import  { useState, useEffect } from 'react';
import './AddPost.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Adds } from '../../../Authorization/Api';
import { Select, Form, Input, Button,Spin  } from 'antd';

const AddPost = () => {
    const navigate = useNavigate();
    const [mess, setMess] = useState('');
    const [idNamePairs, setIdNamePairs] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const idNamePairsString = localStorage.getItem('idNamePairs');
        if (idNamePairsString) {
            setIdNamePairs(JSON.parse(idNamePairsString));
        }
    }, []);

    const handleChange = (value: number, option: any) => {
        form.setFieldsValue({ ownerId: value });
    };

    const onFinish = async (values: any) => {
        try {
            values.status = parseInt(values.status);
            const res = await axios.post(Adds, values);
            console.log('Post created:', res.data);
            setMess('Thêm thành công. Chuyển trang sau 2s.');
            setTimeout(() => {
                navigate('/list');
            }, 2000);
        } catch (error) {
            console.error('Lỗi tạo mới:', error);
        }
    };

    return (
            <>
                <h1 className='title'>THÊM</h1>
                <div className="">
                    {mess && <div className='mess'>{mess}     <Spin size="large" /></div>}
                    <Form form={form} onFinish={onFinish} name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        autoComplete="off">
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="summary" label="Summary" rules={[{ required: true, message: 'Please input the summary!' }]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input the content!' }]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please input the status!' }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="ownerId" label="Owner ID">
                            <Select style={{ width: 170 }} onChange={handleChange}>
                                {idNamePairs.map(({ id, name }) => (
                                    <Select.Option key={id} value={id}>{id} - {name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button className='but' type="primary" htmlType="submit">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </>
    );
};

export default AddPost;
