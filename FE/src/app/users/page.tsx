"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type User = {
  id?: string;
  name: string;
  email: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  const createUser = async () => {
    try {
      const response = await api.post("/users", { name: newUser?.name, email: newUser?.email });
      console.log(response.data);
      fetchUsers();
      setNewUser(null);
    } catch (error: any) {
      console.log({ error });
      setError(`Failed to create user: ${error.response.data.message}`);
      console.error("Error:", error);
    }
  };

  const deleteUser = async (id: string) => {
    console.log({ id });
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      setError("Failed to delete user");
      console.error("Error:", error);
    }
  };

  const editUser = async (id: string, user: User) => {
    try {
      await api.put(`/users/${id}`, user);
      fetchUsers();
    } catch (error) {
      setError("Failed to edit user");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            {user.id && (
              <>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => setSelectedUser(user)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Name"
        onChange={e =>
          selectedUser
            ? setSelectedUser({
                ...selectedUser,
                name: e.target.value,
              })
            : setNewUser({
                name: e.target.value || "",
                email: newUser?.email || "",
              })
        }
        value={newUser?.name || selectedUser?.name || ""}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={e =>
          selectedUser
            ? setSelectedUser({
                ...selectedUser,
                email: e.target.value,
              })
            : setNewUser({
                name: newUser?.name || "",
                email: e.target.value,
              })
        }
        value={newUser?.email || selectedUser?.email || ""}
      />
      {selectedUser ? (
        <button onClick={() => editUser(selectedUser.id, selectedUser)}>Save</button>
      ) : (
        <button onClick={createUser}>Create User</button>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}
