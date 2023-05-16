const express = require('express');

const { isvalidUserID, isvalidUserData } = require('../helper/validation');

const { buildResponse } = require('../helper/buildResponse')
const { Service } = require('../service/user.service');
const service = new Service()

class Controller {
    constructor() {
        this.router = express.Router();
        this.initRoure()
    }

    initRoure() {
        this.router.get('/', (req, res) => {
            try {
                const data = service.getAllUser();

                buildResponse(res, 200, data)
            } catch (error) {
                buildResponse(res, 404, error.message)
            }
        });

        this.router.delete('/:id', (req, res) => {
            try {
                const { id } = req.params;
                const data = service.deleteUser(id);

                buildResponse(res, 200, data)
            } catch (error) {
                buildResponse(res, 404, error.message)
            }
        });

        this.router.get('/:id', isvalidUserID, (res, req) => {
            try {
                const { id } = req.params;
                const data = service.getUserById(id);

                buildResponse(res, 200, data)
            } catch (error) {
                buildResponse(res, 404, error.message)
            }
        });

        this.router.put('/:id', isvalidUserID, isvalidUserData, (req, res) => {
            try {
                const { id } = req.params;
                const { name, surname, email, pwd } = req.body;
                const data = service.updateUser(id, name, surname, email, pwd);
                buildResponse(res, 200, data)
            } catch (error) {
                buildResponse(res, 404, error.message)
            }
        });

        this.router.patch('/:id', isvalidUserID, (req, res) => {
            try {
                const { id } = req.params;
                const clientObj = req.body;
                const data = service.patchUser(id, clientObj);
                buildResponse(res, 200, data)
            } catch (error) {
                buildResponse(res, 404, error.message)
            }
        });

        this.router.post('/', isvalidUserData, (req, res) => {
            try {
                const { name, surname, email, pwd } = req.body;
                const data = service.createUser(name, surname, email, pwd);
                buildResponse(res, 201, data)
            } catch (error) {
                buildResponse(res, 404, error.message)
            }
        });
    }
};

module.exports = Controller;