# Learning React Form

Dokumentasi fitur **Form Data Pengguna** menggunakan React Hook Form dan Zod.

## Deskripsi

Proyek ini merupakan latihan pembuatan form pengguna dengan React dan Vite. Form mendukung penambahan data, pengeditan data, validasi input, penanganan error, loading state, reset form, serta notifikasi sukses dan gagal.

Data disimpan sementara di `localStorage` agar latihan dapat berjalan tanpa backend. Integrasi ke API akan dilakukan pada tahap berikutnya.

## Teknologi

| Teknologi | Versi | Fungsi |
|---|---|---|
| React | 19.3.1 | Library UI |
| Vite | 8.3.5 | Build tool dan development server |
| Tailwind CSS | 4.3.4 | Styling |
| React Hook Form | 7.91.0 | Pengelolaan state dan validasi form |
| Zod | 4.6.7 | Skema validasi |
| @hookform/resolvers | 7.0.2 | Penghubung React Hook Form dan Zod |
| SweetAlert2 | 11.26.25 | Notifikasi sukses, error, dan konfirmasi |

## Fitur

- Menampilkan daftar pengguna.
- Menambah pengguna baru.
- Mengedit data pengguna.
- Validasi input menggunakan React Hook Form dan Zod.
- Menampilkan pesan error per field.
- Menangani error dari service, termasuk email duplikat.
- Menampilkan loading state saat mengambil data dan saat submit.
- Reset form setelah data berhasil ditambahkan.
- Mengisi form otomatis saat mode edit menggunakan default value.
- Menampilkan success state melalui SweetAlert2.
- Menyimpan data di `localStorage`.

## Prasyarat

- Node.js 20.19+ atau 22.12+
- npm

## Instalasi dan Menjalankan

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite, biasanya:

```text
http://localhost:5173
```

Build produksi:

```bash
npm run build
npm run preview
```

## Struktur Folder

```text
learning-react-form/
├─ src/
│  ├─ components/
│  │  ├─ FormInput.jsx
│  │  └─ UserForm.jsx
│  ├─ schemas/
│  │  └─ userSchema.jsx
│  ├─ services/
│  │  └─ userService.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
└─ vite.config.js
```

Keterangan:

- `components/` berisi komponen tampilan dan form.
- `schemas/` berisi aturan validasi Zod.
- `services/` berisi logika penyimpanan data.
- `App.jsx` merangkai halaman form dan daftar pengguna.
- `index.css` memuat Tailwind CSS.

## Alur Aplikasi

1. `App` memuat daftar pengguna dari `userService`.
2. `UserForm` menampilkan form tambah atau edit.
3. Input didaftarkan ke React Hook Form menggunakan `register`.
4. Saat submit, `handleSubmit` menjalankan validasi Zod.
5. Jika valid, `onSubmit` memanggil service untuk menyimpan data.
6. Setelah berhasil, daftar pengguna dimuat ulang.
7. SweetAlert2 menampilkan notifikasi sukses.
8. Jika gagal, error ditampilkan pada field terkait atau melalui SweetAlert2.

## Skema Validasi

| Field | Aturan | Pesan Error |
|---|---|---|
| Nama | Wajib diisi, minimal 3 karakter, maksimal 50 karakter | Nama Wajib Di Isi, Nama Minimal 3 Karakter, Nama Maksimal 50 Karakter |
| Email | Wajib diisi, format email valid | Email Wajib Diisi, Email tidak valid |
| Umur | Berupa angka, bilangan bulat, minimal 17, maksimal 30 | Umur harus berupa angka, Umur harus minimal 17 tahun, Umur harus dibawah 30 tahun |
| Gender | Harus salah satu dari `Pria` atau `Wanita` | Pilih Gender |
| Setuju | Harus bernilai `true` | Kamu harus menyetujui persyaratan & ketentuan |
| Email duplikat | Dicek di `userService` | Email sudah terdaftar, gunakan email lain |

## Penjelasan Implementasi

### 1. React Hook Form

Pengaturan form terdapat di `src/components/UserForm.jsx`:

```jsx
const {
  register,
  handleSubmit,
  reset,
  setError,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: zodResolver(userSchema),
  mode: "onTouched",
  defaultValues: initialData ?? EMPTY_USER,
});
```

Penjelasan:

- `resolver: zodResolver(userSchema)` menghubungkan form dengan skema Zod.
- `mode: "onTouched"` membuat validasi pertama berjalan setelah field disentuh.
- `defaultValues` menentukan nilai awal form. Untuk mode edit, nilainya berasal dari `initialData`.
- `register` menghubungkan input ke React Hook Form.
- `handleSubmit` menjalankan validasi sebelum memanggil fungsi submit.
- `reset` mengembalikan form ke nilai awal.
- `setError` menempelkan error dari service ke field tertentu.
- `isSubmitting` menandai proses submit yang sedang berjalan.

### 2. Skema Zod

Skema validasi berada di `src/schemas/userSchema.jsx`:

```js
import { z } from "zod";

export const userSchema = z.object({
  nama: z
    .string()
    .trim()
    .min(1, { message: "Nama Wajib Di Isi" })
    .min(3, { message: "Nama Minimal 3 Karakter" })
    .max(50, { message: "Nama Maksimal 50 Karakter" }),

  email: z
    .string()
    .trim()
    .min(1, { message: "Email Wajib Diisi" })
    .email({ message: "Email tidak valid." }),

  umur: z
    .number({ error: "Umur harus berupa angka." })
    .int({ message: "Umur harus berupa angka" })
    .min(17, { message: "Umur harus minimal 17 tahun" })
    .max(30, { message: "Umur harus dibawah 30 tahun." }),

  gender: z.enum(["Pria", "Wanita"], {
    error: "Pilih Gender",
  }),

  setuju: z.literal(true, {
    error: "kamu harus menyetujui persyaratan & ketentuan.",
  }),
});

export const EMPTY_USER = {
  nama: "",
  email: "",
  umur: 17,
  gender: "",
  setuju: false,
};
```

Penjelasan:

- `trim()` menghapus spasi di awal dan akhir string.
- `min()` dan `max()` membatasi panjang teks.
- `email()` memvalidasi format email.
- `number()` memastikan umur berupa angka.
- `int()` memastikan umur bilangan bulat.
- `enum()` membatasi gender hanya pada nilai yang diizinkan.
- `literal(true)` memastikan checkbox persetujuan benar-benar dicentang.
- `EMPTY_USER` menjadi nilai awal form dan nilai reset.

### 3. Error Message

Error validasi ditampilkan di bawah field melalui komponen `FormInput`:

```jsx
<FormInput
  label="Nama"
  type="text"
  placeholder="Masukkan Nama Lengkap."
  {...register("nama")}
  error={errors.nama?.message}
/>
```

`FormInput` juga menambahkan atribut aksesibilitas:

- `aria-invalid` menandai input yang sedang error.
- `aria-describedby` menghubungkan input dengan pesan error.
- `role="alert"` membuat pesan error diumumkan oleh pembaca layar.

Error dari service ditangani di `UserForm`:

```jsx
if (error.message === "EMAIL_DUPLICATE") {
  setError("email", {
    type: "server",
    message: "Email sudah terdaftar, gunakan email lain.",
  });

  Swal.fire({
    icon: "error",
    title: "Email sudah terdaftar",
    text: "Silahkan gunakan email lain.",
  });
} else {
  setError("root.server", {
    type: "server",
    message: error.message || "Terjadi kesalahan, silahkan coba lagi",
  });

  Swal.fire({
    icon: "error",
    title: "Gagal menyimpan",
    text: error.message || "Terjadi kesalahan, silahkan coba lagi.",
  });
}
```

### 4. Loading State

Loading state pada tombol submit menggunakan `isSubmitting`:

```jsx
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Menyimpan.." : initialData ? "Perbarui" : "Simpan"}
</button>
```

Tombol dinonaktifkan selama proses submit untuk mencegah pengiriman ganda.

Daftar pengguna juga memiliki loading state tersendiri:

```jsx
{isLoading && (
  <p className="text-sm text-gray-500">Memuat data...</p>
)}
```

### 5. Submit

Form menggunakan `handleSubmit` dan `noValidate`:

```jsx
<form onSubmit={handleSubmit(submit)} noValidate>
```

- `handleSubmit` memastikan fungsi submit hanya dijalankan setelah validasi lolos.
- `noValidate` mematikan validasi bawaan browser agar pesan dari Zod yang digunakan.

### 6. Reset Form

Setelah data berhasil ditambahkan, form dikembalikan ke nilai awal:

```jsx
if (!initialData) {
  reset(EMPTY_USER);
}
```

Reset hanya dilakukan pada mode tambah. Pada mode edit, form tidak di-reset karena pengguna kembali ke mode tambah setelah proses edit selesai.

### 7. Default Value untuk Edit

Nilai awal form ditentukan dari data yang sedang diedit:

```jsx
defaultValues: initialData ?? EMPTY_USER,
```

`App` memastikan form di-mount ulang ketika data edit berubah:

```jsx
<UserForm
  key={editingUser?.id ?? "create"}
  initialData={editingUser}
  onSubmit={handleSubmit}
  onCancel={() => setEditingUser(null)}
/>
```

Dengan `key` tersebut, React akan membuat ulang komponen form dan mengisi `defaultValues` sesuai data pengguna yang dipilih.

### 8. Success State

Notifikasi sukses menggunakan SweetAlert2:

```jsx
Swal.fire({
  icon: "success",
  title: initialData ? "Berhasil diperbarui" : "Berhasil disimpan",
  text: initialData
    ? "Data pengguna berhsil diperbarui."
    : "Pengguna berhasil ditambahkan",
  showConfirmButton: false,
  timer: 1500,
});
```

## Penyimpanan Data

Data disimpan di `localStorage` dengan kunci `latihan_users`.

Fungsi penyimpanan berada di `src/services/userService.js`:

- `getUsers()` mengambil seluruh data.
- `getUserById(id)` mengambil satu data berdasarkan id.
- `createUser(payload)` menambahkan data baru dan mengecek email duplikat.
- `updateUser(id, payload)` memperbarui data dan mengecek email duplikat.

Untuk menghapus seluruh data latihan, jalankan perintah berikut di Console browser:

```js
localStorage.removeItem("latihan_users");
```

## Scripts

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Membuat build produksi |
| `npm run preview` | Melihat hasil build |
| `npm run lint` | Menjalankan ESLint |

## Catatan dan Keterbatasan

- Tahap ini masih menggunakan `localStorage`, belum terhubung ke API.
- Integrasi API dengan axios direncanakan pada tahap 9.
- Fitur hapus data belum tersedia.
- Navigasi antar halaman belum menggunakan React Router.
- Data hanya tersimpan di browser yang digunakan.

## Repository

https://github.com/ragilbagus12/learning-react-form
