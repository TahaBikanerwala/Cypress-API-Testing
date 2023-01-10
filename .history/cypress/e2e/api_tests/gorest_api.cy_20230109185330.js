/// <reference types = "Cypress" />
const data = require("../../fixtures/user_details");
describe("First GET API Test Case", () => {
  let accessToken =
    "Bearer 34dc3e5b4880b735500c024c5962432124efe41a58a1423140bc32c40ef89b1c";

  let randomText = "";
  let randomMail = "";
  const pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++) {
    randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
  }
  randomMail = randomText + "@gmail.com";

  //Using async for writing Test Case
  it("GET users", async () => {
    const res = await cy.request({
      method: "GET",
      url: "https://gorest.co.in/public/v2/users/",
      headers: {
        authorization: accessToken,
      },
    });
    expect(res.status).equal(200);
  });

  //Using Fixtures for data
  it("Create User using POST and then Delete the User", () => {
    let res_id=null;
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/users",
      headers: {
        authorization: accessToken,
      },
      body: {
        name: data.name,
        email: randomMail,
        gender: data.gender,
        status: data.status,
      },
    })
      .then((resp) => {
        expect(resp.body.name).to.eq(data.name);
        expect(resp.body.gender).to.eq(data.gender);
        expect(resp.body.status).to.eq(data.status);
        expect(resp.body).has.property("id");
        res_id = resp.body.id;
  
      })
      .then((res_id) => {
        cy.request({
          method: "GET",
          url: "https://gorest.co.in/public/v2/users/"+res_id,
          headers: {
            authorization: accessToken
          }
        })
          .then((res) => {
            expect(res.body).has.property("id", res_id);
     
          })
          .then((res_id) => {
            cy.request({
              method: "DELETE",
              url: "https://gorest.co.in/public/v2/users/"+res_id,
              headers: {
                authorization: accessToken
              }
            });
          });
      });
  });

});
