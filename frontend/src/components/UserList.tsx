// components/UserList.tsx
import React, { useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch users from the backend
    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <button onClick={fetchUsers} disabled={loading}>
                {loading ? 'Loading...' : 'Refresh List'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {users.length > 0 ? (
                    users.map((user: { id: number; name: string; email: string }) => (
                        <li key={user.id}>
                            <strong>{user.name}</strong> - {user.email}
                        </li>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
