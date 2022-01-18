/**
 * @jest-environment node
 */


const app = require('../src');

const request = require('supertest');
const { TestWatcher } = require('jest');

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJsb2dpbiI6ImFkbWluIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MjA5NzQ5MCwiZXhwIjoxNjQyMTgzODkwfQ.3JPvIdCzGRrgCgLXctEEIv8yMOeloGEPZA7z_0Fyu0A';

describe('Get Endpoints', () => {
    it('should get info of user', () => {
        return request(app)
            .get('/users/info')
            .set('Authorization', `Bearer ${jwt}`)
            .send()
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('email');
            });
    });
    it('should get list of users', () => {
        return request(app)
            .get('/users/')
            .set('Authorization', `Bearer ${jwt}`)
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
    it('should get user by id', () => {
        return request(app)
            .get('/users/1')
            .set('Authorization', `Bearer ${jwt}`)
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
    it('should return not found when get user by id', () => {
        return request(app)
            .get('/users/120')
            .set('Authorization', `Bearer ${jwt}`)
            .then((res) => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('should get list of comforts', () => {
        return request(app)
            .get('/drivers/comforts')
            .set('Authorization', `Bearer ${jwt}`)
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
    it('should get list drivers for chosen comfort', () => {
        return request(app)
            .get('/drivers/comforts/1/drivers')
            .set('Authorization', `Bearer ${jwt}`)
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
});


describe('Post endpoints', () => {
    it('should create order', () => {
        const order = {
            "date": "2021-08-20",
            "startPointX": 23.7658,
            "startPointY": 12.345436,
            "endPointX": 27.812196,
            "endPointY": 16.386076,
            "price": 50,
            "passedDistance": 79.1
        };
        return request(app)
            .post('/orders')
            .set('Authorization', `Bearer ${jwt}`)
            .send(order)
            .then((res) => {
                expect(res.statusCode).toEqual(201);
            })
    });
    it('should create feedback', () => {
        const feedback = {
            "raiting": 1,
            "feedback": "Неприятный водитель"
        };
        return request(app)
            .post('/orders/2/feedback')
            .set('Authorization', `Bearer ${jwt}`)
            .send(feedback)
            .then((res) => {
                expect(res.statusCode).toEqual(201);
                expect(res.body).toHaveProperty('raiting');
            })
    });
    it('should create car by admin', () => {
        const car = {
            "comfortId": 1,
            "stateNumber": "8743 KT-5",
            "model": "Renault Logan",
            "color": "#FFFF00"
        };
        return request(app)
            .post('/drivers/cars')
            .set('Authorization', `Bearer ${jwt}`)
            .send(car)
            .then((res) => {
                expect(res.statusCode).toEqual(201);
                expect(res.body).toHaveProperty('id');
            })
    });
})

// it('should log into server', () => {
//     request(app).post('/login').send({
//         login: 'user',
//         password: 'pass'
//     }).then((res) => {
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('token');
//     });
// })