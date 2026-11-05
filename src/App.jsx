import { useCallback, useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import { updateUser, createUser, getUsers } from "./services/userService";

export default function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState("");

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setListError("");

    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setListError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSubmit = async (data) => {
    if (editingUser) {
      await updateUser(editingUser.id, data);
      setEditingUser(null);
    } else {
      await createUser(data);
    }

    await loadUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 pb-12">
        <header className="mb-6">
          <h1 className="mb-1 text-2xl font-semibold text-gray-800">
            Latihan Form Pengguna
          </h1>
          <p className="text-sm text-gray-500">
            React Hook Form + Zod 4 + Tailwind CSS 4
          </p>
        </header>
        
        <main className="grid gap-4 lg:grid-cols-2 lg:items-start">
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              {editingUser ? "Edit Pengguna" : "Tambah Pengguna" }
            </h2>

            <UserForm 
              key={editingUser?.id ?? "create"}
              initialData={editingUser}
              onSubmit={handleSubmit}
              onCancel={() => setEditingUser(null)}
            />
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Daftar Pengguna
            </h2>
            {isLoading && (
              <p className="text-sm text-gray-500">Memuat data...</p>
            )}

            {listError && (
              <p className="text-sm font-medium text-red-600">{listError}</p>
            )}

            {!isLoading && !listError && users.length === 0 && (
              <p className="text-sm text-gray-500">
                Belum ada data. Silahkan tambah pengguna.
              </p>
            )}

            <ul className="grid gap-2.5">
              {users.map((user) => (
                <li
                key={user.id}
                className="flex items-center justify-between gap-3 rounded-lg  border border-gray-200 px-3 py-3"
                >
                  <div className="min-w-0">
                    <strong className="block truncate text-sm font-semibold text-gray-800">
                      {user.nama}
                    </strong>
                    <span className="block truncate text-xs text-gray-500">
                      {user.email} - {user.umur} tahun - {user.gender}
                    </span>
                  </div>

                  <button
                  type="button"
                  onClick={() => setEditingUser(user)}
                  className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-blue-50"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}