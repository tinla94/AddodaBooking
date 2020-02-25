process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

// create a new user
let token = '';
const userLoginInfo = {
    email: 'test@test.com',
    password: 'test123'
}

chai.use(chaiHttp);


describe('Testing Auth routes', () => {
    // Testing login route
    describe('test POST /api/auth/signin', done => {
        it('it will return token once user login', done => {
            chai
                .request(app)
                .post('/api/auth/signin')
                .send(userLoginInfo)
                .end((err, res => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.should.have.property('auth-token')
                token = res.body.token
                done()
            }))
        })
    })
})