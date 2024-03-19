import React, { useState, useEffect } from 'react';
import './ListUser.css';

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
        fetch('http://localhost:3001/auth')
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

    return (
        <div>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AccountList;
