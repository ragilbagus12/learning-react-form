import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMPTY_USER, userSchema } from "../schemas/userSchema";
import FormInput from "./FormInput";

function UserForm({ initialData, onSubmit, onCancel}) {
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

    const [succesMessage, setSuccesMessage] = useState("");

    const submit = async (data) => {
        setSuccesMessage("");

        try {
            await onSubmit(data);
            setSuccesMessage(
                initialData ? "Data Berhasil Di Perbarui" : "Data Berhasil Disimpan"
            );

            if (!initialData) {
                reset(EMPTY_USER);
            }
        } catch (error) {
            if (error.message === "EMAIL_DUPLICATE") {
                setError("email", {
                    type: "server",
                    message: "Email sudah terdaftar, gunakan email lain.",
                });
            } else {
                setError("root.server", {
                    type: "server",
                    message: error.message || "Terjadi kesalahan, silahkan coba lagi",
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} noValidate>
            {succesMessage && (
                <p role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700">
                    {succesMessage}
                </p>
            )}
            {errors.root?.server && (
                <p role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700">
                    {errors.root.server.message}
                </p>
            )}
            <FormInput 
                label="Nama"
                type="text"
                placeholder="Masukkan Nama Lengkap."
                {...register("nama")}
                error={errors.nama?.message}
            />
            <FormInput 
                label="Email"
                type="email"
                placeholder="Masukkan Alamat Email"
                {...register("email")}
                error={errors.email?.message}
            />
            <FormInput 
                label="Umur"
                type="number"
                {...register("umur", {valueAsNumber: true})}
                error={errors.umur?.message}
            />

            <div className="mb-4 grid gap-1.5">
                <label htmlFor="field-gender" className="text-sm font-semibold text-gray-700">
                    Gender
                </label>
                <select 
                id="field-gender"
                aria-invalid={errors.gender ? "true" : "false"}
                {...register("gender")}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 aria-invalid:border-red-500">
                    <option value="">Pilih Gender</option>
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                </select>

                {errors.gender && (
                    <p role="alert" className="text-xs font-medium text-red-500">
                        {errors.gender.message}
                    </p>
                )}
            </div>

            <div className="mb-4 flex items-center gap-2">
                <input
                    id="field-setuju"
                    type="checkbox"
                    {...register("setuju")}
                    className="h-4 w-4 accent-blue-600" 
                />
                <label htmlFor="field-setuju" className="text-sm text-gray-700">
                    Saya menyetujui syarat & ketentuan
                </label>
            </div>

            {errors.setuju && (
                <p role="alert" className="mb-4 text-xs font-medium text-red-600">
                    {errors.setuju.message}
                </p>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                    {isSubmitting
                    ? "Menyimpann.." 
                    : initialData
                    ? "Perbarui" 
                    : "Simpan" }
                </button>

                {initialData && (
                    <button 
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-60">
                        Batal
                    </button>
                )}
            </div>
        </form>
    );
}

export default UserForm;