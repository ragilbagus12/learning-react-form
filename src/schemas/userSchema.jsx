import { z } from "zod";

export const userSchema = z.object({
    nama: z
    .string()
    .trim()
    .min(1, { message: "Nama Wajib Di Isi"})
    .min(3, { message: "Nama Minimal 3 Karakter"})
    .max(50, { message: "Nama Maksimal 50 Karakter" }),

    email: z 
    .string()
    .trim()
    .min(1, { message: "Email Wajib Diisi" })
    .email({ message: "Email tidak valid." }),

    umur: z
    .number({ invalid_type_error: "Umur harus berupa angka." })
    .int({ message: "Umur harus berupa angka" })
    .min(17, { message: "Umur harus minimal 17 tahun" })
    .max(30, { message: "Umur harus dibawah 30 tahun." }),

    // Menggunakan z.string().min() agar string kosong "" di awal bisa memicu pesan "Pilih Gender" saat belum dipilih
    gender: z.string().min(1, { message: "Pilih Gender" }),

    setuju: z.literal(true, {
        errorMap: () => ({ message: "Kamu harus menyetujui persyaratan & ketentuan" })
    }),
});

export const EMPTY_USER = {
    nama: "",
    email: "",
    umur: 17, // Diubah menjadi tipe angka (number)
    gender: "", // Kosong agar dropdown menampilkan opsi "Pilih Gender"
    setuju: false,
};