import data from '../fixtures/logInCreds.json';

describe('API Tests Using Plugin', () => {
  let sidValueGlobal;
  let carIdGlobal;

  const userBody = {
    "email": data.email,
    "password": data.password,
    "remember": data.remember
  };

  beforeEach(() => {
    cy.visit('/');
    cy.api('POST', '/api/auth/signin', userBody).then((response) => {
      cy.wrap(response.status).should('eq', 200);
      const sidCookie = response.headers['set-cookie'][0];
      const sidValue = sidCookie.split(';')[0].split('=')[1];
      sidValueGlobal = sidValue;
    });
  });

  it('GET request: Verify cars list', () => {
    cy.api('GET', `**/cars`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('POST request: Add a car', () => {
    const carBody = {
      "carBrandId": 2,
      "carModelId": 8,
      "mileage": 500
    };
    cy.api({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/cars',
      body: carBody,
      headers: {
        'Cookie': `sid=${sidValueGlobal}`
      }
    }).should((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.carBrandId).to.eq(2);
      expect(response.body.data.carModelId).to.eq(8);
      expect(response.body.data.mileage).to.eq(500);

      let carId = response.body.data.id;
      carIdGlobal = carId;
    });
  });

  it('DELETE request: Remove a car', () => {
    cy.api('DELETE', `https://qauto.forstudy.space/api/cars/${carIdGlobal}`).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.carId).to.eq(carIdGlobal);
    });
  });

});