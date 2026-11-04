import { promise } from "zod";

const STORAGE_KEY = "latihan_users";

function readUsers() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function writeUsers(users) {
    localStorage.getItem(STORAGE_KEY, JSON.stringify(users));
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let nextId = Date.now();

export async function getUsers() {
    await delay(400);
    return readUsers();
}

export async function getUserById(id) {
    await delay(300);
    const user = readUsers().find((item) => item.id === id);

    if (!user) {
        throw new Error("Pengguna tidak di temkan.");
    }

    return user;
}

export async function createUser(payload) {
    await delay(600);
    const users = readUsers();
    const emailExists = users.some(
        (item) => item.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (emailExists) {
        throw new Error("EMAIL_DUPLICATE");
    }

    const newUser = {...payload, id: `u-${nextId++}`};
    writeUsers([newUser, ...users]);
    return newUser;
}

export async function updateUser(id, payload) {
    await delay(600);
    const users = readUsers();
    const emailExists = users.some(
        (item) => item.id !== id &&
        item.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (emailExists) {
        throw new Error("EMAIL_DUPLICATE");
    }

    const index = users.findIndex((item) => item.id === id);

    if (index === -1) {
        throw new Error("Pengguna tidak ditemukan.");
    }

    const updateUser = {...users[index], ...payload };
    users[index] = updateUser();
    writeUsers(users);
    return updateUser;
}