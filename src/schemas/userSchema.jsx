import { email, z } from "zod";

export const userSchema = z.object({
    nama: z
    .string()
    .trim()
    .min(1, { message: "Nama Wajib Di Isi"})
    .min(3, {message: "Nama Minimal 3 Karakter"})
    .max(50, {message: "Nama Maksimal 50 Karakter"}),

    email: z 
    .string()
    .trim()
    .min(1, {message: "Email Wajib Diisi"})
    .email({message: "Email tidak valid."}),

    umur: z
    .number({ error: "Umur harus berupa angka." })
    .int({ message: "Umur harus berupa angka" })
    .min(17, { message: "Umur harus 17 tahun," })
    .max(30, { message: "Umur harus dibawah 30 tahun." }),

    gender: z.enum(["Pria", "Wanita"], {
        error: "Pilih Gender"
    }),

    setuju: z.literal(true, {
        error: "Kamu harus menyetujui persyaratan & ketentuan"
    }),
});

export const EMPTY_USER = {
    nama: "",
    email: "",
    umur: "17",
    gender: "",
    setuju: false,
};