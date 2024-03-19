import React, { useState, useEffect } from 'react';
import './AddPost.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Adds } from '../../../Authorization/Api';
import { Select } from 'antd';

interface PostData {
    title: string;
    summary: string;
    content: string;
    status: number;
    ownerId: number;
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
    const [idNamePairs, setIdNamePairs] = useState([]);

    useEffect(() => {
        const idNamePairsString = localStorage.getItem('idNamePairs');
        if (idNamePairsString) {
            setIdNamePairs(JSON.parse(idNamePairsString));
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/posts/${id}`);
                const postData = response.data;
                setFormData(postData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (value: number, option: any) => {
        setFormData((prevFormData) => ({ ...prevFormData, ownerId: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { title, summary, status, content } = formData;
            const postData = { title, summary, status, content, ownerId: formData.ownerId };
            const res = await axios.put(`${Adds}/${id}`, postData);
            console.log('Post updated:', res.data);
            setMess('Cập nhật thành công. Chuyển trang sau 2s.');
            setTimeout(() => {
                navigate('/list');
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
    };
    return (
        <div className="admin-page">
            <nav className="side-menu">
                <ul>
                    <li><a href="/list">Sản phẩm</a></li>
                    <li><a href="/user">Tài khoản</a></li>
                </ul>
            </nav>
            <main>
                <header>
                    <h1>Admin</h1>
                </header>
                <div className="content">
                    <h2>Cập nhật</h2>
                    <div className="form-container">
                        {mess && <div className='mess'>{mess}</div>}

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Summary:</label>
                                <textarea
                                    name="summary"
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Content:</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Status:</label>
                                <input
                                    type="number"
                                    name="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: parseInt(e.target.value, 10) })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Owner ID:</label>
                                <Select
                                    style={{ width: 170 }}
                                    value={formData.ownerId}
                                    onChange={handleChange}
                                >
                                    {idNamePairs.map(({ id, name }) => (
                                        <Select.Option key={id} value={id}>{id} - {name}</Select.Option>
                                    ))}
                                </Select>

                            </div>
                            <button className='but' type="submit">Cập nhật</button>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default UpdatePost;
