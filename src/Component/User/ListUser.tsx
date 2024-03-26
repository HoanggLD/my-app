import React, { useState, useEffect } from 'react';
import './ListUser.css';
import { Link } from 'react-router-dom';
import { Button, Popconfirm, message } from 'antd';
import axios from 'axios';
import { ListUser } from '../../Authorization/Api';

interface Account {
    id: number;
    email: string;
    password: string;
    phone: string;
    name: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    return formattedDate;
};
const AccountList: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        fetch(ListUser)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi');
                }
                return response.json();
            })
            .then((responseData: { data: Account[] }) => {
                if (Array.isArray(responseData.data)) {
                    const formattedAccounts = responseData.data.map((account: Account) => ({
                        ...account,
                        createdAt: formatDate(account.createdAt),
                        updatedAt: formatDate(account.updatedAt)
                    }));
                    setAccounts(formattedAccounts);
                    const idNamePairs = formattedAccounts.map(({ id, name }: Account) => ({ id, name }));
                    localStorage.setItem('idNamePairs', JSON.stringify(idNamePairs));
                } else {
                    throw new Error('Dữ liệu không phải là một mảng');
                }
            })
            .catch(error => {
                console.error('Lỗi hiển thị tài khoản', error);
                setError('Lỗi hiển thị tài khoản' + error.message);
            });
    }, []);
    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:3003/auth/${id}`)
            .then(response => {
                console.log('Xóa sản phẩm thành công', response.data);
                setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== id));
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
        <div className="admin-page">
            <div className='account'>
                <h1>Account List</h1>
                {error && <div>{error}</div>}
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Password</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account: Account) => (
                            <tr key={account.id}>
                                <td>{account.id}</td>
                                <td>{account.email}</td>
                                <td>{account.name}</td>
                                <td>
                                    <span className="password-cell">{'*'.repeat(account.password.length)}</span>
                                </td>
                                <td>{account.phone}</td>
                                <td>{account.status}</td>
                                <td>{account.createdAt}</td>
                                <td>
                                    <Link to={`/updates/${account.id}`}>
                                        <Button type="primary">Cập nhật</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa không"
                                        onConfirm={() => confirmDelete(account.id)}
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
        </div>
    );
};

export default AccountList;
