const fs = require('fs');
const path = './storage/storage.json';

function getAllUser() {
    const data = JSON.parse(fs.readFileSync(path));
    if (!data.lenght) throw new Error('empty')
    return data
};

function deleteUser(id) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id != id);

    if (filtered.lenght == data.lenght) throw new Error('id is not found')

    fs.writeFileSync(path, JSON.stringify(filtered));
    return filtered;
};

function getUserById(id) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id == 0);

    if (!filtered.lenght) throw new Error('id not found')

    return filtered
};
function updateUser(id, name, surname, email, pwd) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id != id);

    const item = {
        id: +id,
        name: name,
        surname: surname,
        email: email,
        pwd: pwd
    }
    if (filtered.length === data.length) throw new Error('id not found');
    filtered.push(item)

    fs.writeFileSync(path, JSON.stringify(filtered));
    return filtered
};

function createUser(name, surname, email, pwd) {
    const data = JSON.parse(fs.readFileSync(path));
    const item = {
        id: data.length + 1,
        name: name,
        surname: surname,
        email: email,
        pwd: pwd
    }
    data.push(item)
    return data
};

function patchUser(id, clientObj) {
    const data = JSON.parse(fs.readFileSync(path));

    const oldData = data.find((el) => el.id == id);

    const newData = { ...oldData, ...clientObj };

    const patched = data.filter((el) => el.id != id);
    
    if (data.length == patched.length) throw new Error('id not found')
    patched.push(newData)

    fs.writeFileSync(path, JSON.stringify(patched))
    return patched
}


module.exports = {
    getAllUser,
    deleteUser,
    getUserById,
    updateUser,
    createUser,
    patchUser
}