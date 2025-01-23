/// <reference types ="cypress" />

describe('CRUD for fuel expenses', () => {
    let sidValueGlobal;
    let carIdGlobal;
    const today = new Date();
    const futureDate = new Date(today.setDate(today.getDate() + 3));
    const formattedDate = futureDate.toISOString();
    let carCreationDateGlobal;


    before(() => {

        cy.fixture('logInCreds.json').then((userData) => {
            const userBody = {
                "email": userData.email,
                "password": userData.password,
                "remember": userData.remember
            };
            cy.visit('/');
            cy.request('POST', '/api/auth/signin', userBody).then((response) => {
                const sidCookie = response.headers['set-cookie'][0];
                const sidValue = sidCookie.split(';')[0].split('=')[1];
                sidValueGlobal = sidValue;
            });

        });
    });

    it('Add car POST /api/cars', () => {
        const carBody = {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 2100
        };
        cy.request({
            method: 'POST',
            url: 'https://qauto.forstudy.space/api/cars',
            body: carBody,
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('status', 'ok');
            expect(response.body.data.carBrandId).to.eq(1);
            expect(response.body.data.carModelId).to.eq(1);
            expect(response.body.data.mileage).to.eq(2100);

            let carId = response.body.data.id;
            carIdGlobal = carId;

            let carCreationDate = response.body.data.carCreatedAt;
            carCreationDateGlobal = carCreationDate;
        });
    });

    it('Get created car by id GET /api/cars/{id}', () => {
        cy.request({
            method: 'GET',
            url: `/api/cars/${carIdGlobal}`,
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        }).then((response) => {
            cy.wrap(response.status).should('eq', 200);
            expect(response.body).to.have.property('status', 'ok');
            expect(response.body.data.id).to.eq(carIdGlobal);
            expect(response.body.data.carBrandId).to.eq(1);
            expect(response.body.data.carModelId).to.eq(1);
            expect(response.body.data.mileage).to.eq(2100);

        });
    });

    it('Change the date of creation for existing car PUT /api/cars/{id}', () => {
        cy.request({
            method: 'PUT',
            url: `https://qauto.forstudy.space/api/cars/${carIdGlobal}`,
            body: {
                "carBrandId": 1,
                "carModelId": 1,
                "carCreatedAt": formattedDate,
                "mileage": 2102
            },
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        }).then((response) => {
            cy.wrap(response.status).should('eq', 200);
            expect(response.body).to.have.property('status', 'ok');
            expect(response.body.data.id).to.eq(carIdGlobal);
            expect(response.body.data.carBrandId).to.eq(1);
            expect(response.body.data.carModelId).to.eq(1);
            expect(response.body.data.mileage).to.eq(2102);
            expect(response.body.data.carCreatedAt).to.eq(formattedDate);
        });
    });

    it('Change mileage for existing car PUT /api/cars/{id}', () => {

        cy.request({
            method: 'PUT',
            url: `/api/cars/${carIdGlobal}`,
            body: {
                "carBrandId": 1,
                "carModelId": 1,
                "carCreatedAt": carCreationDateGlobal,
                "mileage": 2150
            },
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        }).then((response) => {
            cy.wrap(response.status).should('eq', 200);
            expect(response.body).to.have.property('status', 'ok');
            expect(response.body.data.id).to.eq(carIdGlobal);
            expect(response.body.data.carBrandId).to.eq(1);
            expect(response.body.data.carModelId).to.eq(1);
            expect(response.body.data.mileage).to.eq(2150);

        });
    });
    it('Delete existing car by id DELETE /api/cars/{id}', () => {
        cy.request({
            method: 'DELETE',
            url: `/api/cars/${carIdGlobal}`,
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        }).then((response) => {
            cy.wrap(response.status).should('eq', 200);
            expect(response.body).to.have.property('status', 'ok');
            expect(response.body.data.carId).to.eq(carIdGlobal);
        });

    });
});

