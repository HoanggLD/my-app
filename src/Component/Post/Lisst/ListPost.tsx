import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListPost.css';
import { Link } from 'react-router-dom';

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
        axios.get('http://localhost:3001/posts')
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
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(response => {
                console.log('Xóa sản phẩm thành công', response.data);
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error('Lỗi khi xóa sản phẩm', error);
            });
    };
    return (
        <div>
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
                    <div className='table'>
                        <h1 className='h1'>Product List</h1>
                        <p className='add-button'>  <a href="/add">Thêm sản phẩm</a></p>
                        <table className="table-container" >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Summary</th>
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
                                        <td>{product.content}</td>
                                        <td>{product.owner.name}</td>
                                        <td>{product.owner.email}</td>
                                        <td>{product.owner.phone}</td>
                                        <td>
                                            <Link to={`/update/${product.id}`}>
                                                <button>Update</button>
                                            </Link>

                                        </td>
                                        <td>  <button onClick={() => handleDelete(product.id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ListPost;
