import { useState } from "react";

export default function BasicControlledFrom() {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Nama: ${nama}\nEmail: ${email}`);
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <form onSubmit={handleSubmit}>
                <div className="mb-4 grid gap-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-600">
                        Nama
                    </label>
                    <input id="name" type="text" value={nama} 
                        onChange={(event) => setNama(event.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4 grid gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-600">
                        Email
                    </label>
                    <input type="email" id="email" value={email} 
                        onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-200 focus:ring-blue-200"
                    />
                </div>
                <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white px-4 py-2 hover:bg-blue-700">
                    Kirim
                </button>
            </form>
        </div>
    );
}