const app = require('../index.js');
const supertest = require('supertest');

describe('Login', () => {
    it("Return status 200", async () => {
        const data = {
            email: "teste@gmail.com",
            password: "123456"}
        await supertest(app)
        .get(`/login`)
        .expect(200);
    })
});

describe('Does not exist email', () => {
    it("Return status 404", async () => {
        const data = {
            email: "teste2@gmail.com",
            password: "123456"}
        await supertest(app)
        .get(`/login`)
        .send(data)
        .expect(404);
    })
});

describe('Petition does not exist', () => {
            it("Return status 404", async () => {
                await supertest(app)
                .get(`/petition/`)
                .expect(404);
            })
        });

describe('Search peticoes teste@gmail.com', () => {
            it("Return status 200", async () => {await supertest(app)
                .get(`/search/teste@gmail.com`)
                .expect(200);
            })
        });
describe('peticoes', () => {
            describe("Get peticoes", () => {
            describe('Get peticoes', () => {
                    it("Should return status 200", async () => {await supertest(app)
                            .get(`/peticoes`)
                            .expect(200);
                        })
                    });

describe('Search peticoes error', () => {
            it("Return status 404", async () => {
                await supertest(app)
                .get(`/search/teste@gmail.com`)
                .expect(404);
            })
        });

describe('Post Petition', () => {
            it("Return status 200", async () => {
                const data = {
                    title: 'Título', 
                    description: 'Descrição', 
                    goal: 100
                }; await supertest(app)
                .post(`/peticoes`)
                .send(data)
                .expect(200);
            })
        });

describe('Post Petition ERROR', () => {
            it("Should return status 401", async () => {
                const data = {
                    description: 'Descrição', 
                    goal: 100
                }; await supertest(app)
                    .post(`/peticoes`)
                    .set('Content-Type', 'application/json')
                    .send(data)
                    .expect(401);
            })
        });

describe('Delet Petition ERROR', () => {
            it("Return status 401 ERROR Delete", async () => {
                await supertest(app)
                .delete(`/petition`)
                .set('Authorization', '')
                .expect(401);
            })
        });

describe('Post Create User', () => {
            it("Should return status 200", async () => {
                const data = {
                    email: 'test@gmail.com', 
                    password: '123456'
                };
                await supertest(app)
                .post(`/user`)
                .set('Content-Type', 'application/json')
                .send(data)
                .expect(200);
            })
        });

describe('Post Create User ERROR', () => {
            it("Return status 400", async () => {
                const data = {
                    email: 'teste@gmail.com', 
                    password: '123456'
                };
                await supertest(app)
                    .post(`/user`)
                    .set('Content-Type', 'application/json')
                    .expect(400);
            })
        });

describe('Sign Petition', () => {
            it("Should return status 200", async () => {
                await supertest(app)
                .post(`/sign/petition/`)
                .expect(200);
            })
        });

describe('Sign Petition ERROR', () => {
            it("Should return status 400", async () => {
                await supertest(app)
                    .post(`/sign/petition/`)
                    .expect(400);
            })
        });
    })
});