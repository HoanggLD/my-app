import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListPost.css';
import { Link } from 'react-router-dom';
import { Lists } from '../../../Authorization/Api';
import { Button, message, Popconfirm } from 'antd';


interface Product {
    id: number;
    title: string;
    summary: string;
    content: string;
    status: number;
    owner: {
        id: number;
        name: string;
        email: string;
        phone: string;
    };
}

const ListPost: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        axios.get(Lists)
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    setProducts(response.data.data);
                } else {
                    console.error('Lỗi hiển thị dữ liệu. Dữ liệu không phải là mảng');
                }
            })
            .catch(error => {
                console.error('Lỗi hiển thị dữ liệu.', error);
            });
    }, []);

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:3003/posts/${id}`)
            .then(response => {
                console.log('Xóa sản phẩm thành công', response.data);
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
                message.success('Xóa sản phẩm thành công');
            })
            .catch(error => {
                message.error('Lỗi khi xóa sản phẩm');
            });
    };

    const confirmDelete = (id: number) => {
        handleDelete(id);
    };

    const cancelDelete = () => {
        message.error('Đã hủy xóa sản phẩm');
    };

    return (
        <div className='table'>
            <h1 className='h1'>Danh sách sản phẩm</h1>
            <p className='add-button'><Link to="/add"><Button type="primary">Thêm sản phẩm</Button></Link></p>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Summary</th>
                        <th>Status</th>
                        <th>Content</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: Product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.summary}</td>
                            <td>{product.status}</td>
                            <td>{product.content}</td>
                            <td>{product.owner.name}</td>
                            <td>{product.owner.email}</td>
                            <td>{product.owner.phone}</td>
                            <td>
                                <Link to={`/update/${product.id}`}>
                                    <Button className='Update' type="primary">Cập nhật</Button>
                                </Link>
                            </td>
                            <td>
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa không"
                                    onConfirm={() => confirmDelete(product.id)}
                                    onCancel={cancelDelete}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button className='Deletes' type="primary" danger>Xóa</Button>
                                </Popconfirm>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPost;
