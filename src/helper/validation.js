function isvalidUserID(req, res, next) {
    const { id } = req.params

    if (!id) throw new Error('значение id не может быть пустым');
    if (isNaN(id)) throw new Error('id должно быть числом');
    if (id < 0) throw new Error('id должен быть положительным');

    next()
};

function isvalidUserData(req, res, next) {
    const { name, surname, email, pwd } = req.body

    if (!name) throw new Error('значение name пустое');
    if (!surname) throw new Error('значение surname пустое');
    if (!email) throw new Error('значение email пустое');
    if (!pwd) throw new Error('значение pwd пустое');

    if (!isNaN(name)) throw new Error('значение name не может быть числом');
    if (!isNaN(surname)) throw new Error('значение surname не может быть числом');
    if (!/^[a-z0-9\.\-\_]+@[a-z]+\.[a-z]+$/gm.test(email)) throw new Error('email не соответствует');
    if (pwd.length < 8) throw new Error('pwd менее 8 символов');

    next()
};

module.exports = { isvalidUserID,isvalidUserData }