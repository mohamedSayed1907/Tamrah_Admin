Cypress.Commands.add("login", () => {
  const apiUrl = Cypress.env("apiUrl");
  let idToken;

  cy.request({
    url: `https://tamrah-testing.us-east-2.elasticbeanstalk.com/api/authenticate`,
    method: "POST",
    body: {
      username: "admin",
      password: "admin",
    },
  })
    .then((response) => {
      expect(response.status).to.eq(201);

      // window.localStorage.setItem('token', response.body.user.token)
      idToken = response.body.jwt.id_token;
      cy.log("**user created**");
      cy.log(`**token: ${response.body.jwt.id_token}**`);
    })
    .then(() => ({
      token: idToken,
    }));
});
