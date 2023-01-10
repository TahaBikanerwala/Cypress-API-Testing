/// <reference types = "Cypress" />
describe("First GET API Test Case", () => {
  let accessToken =
    "Bearer 34dc3e5b4880b735500c024c5962432124efe41a58a1423140bc32c40ef89b1c";
  const data = require("../../fixtures/user_details");
  let randomText = "";
  let randomMail = "";
  const pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++) {
    randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
  }
  randomMail = randomText + "@gmail.com";

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

  // it("Create User using POST", async () => {
  //   const res = await cy.request({
  //     method: "POST",
  //     url: "https://gorest.co.in/public/v2/users",
  //     headers: {
  //       authorization: accessToken,
  //     },
  //     body: {
  //       name: data.name,
  //       email: randomMail,
  //       gender: data.gender,
  //       status: data.status,
  //     },
  //   });
  //   cy.log(JSON.stringify(res));
  //   expect(res.body.name).to.eq(data.name);
  //   expect(res.body.gender).to.eq(data.gender);
  //   expect(res.body.status).to.eq(data.status);
  //   const user_id = res.body.id;
  //   const res2 = await cy.request({
  //     method: "GET",
  //     url: "https://gorest.co.in/public/v2/users/"+user_id,
  //     headers: {
  //       authorization: accessToken,
  //     }
  //   });
  //   expect(res2.body.id).to.eq(user_id);
  // });

  //Other way of doing it
 /* it("Create User using POST - method 2", () => {
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/users",
      headers: {
        authorization: accessToken
      },
      body: {
        name: data.name,
        email: randomMail,
        gender: data.gender,
        status: data.status,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.body.name).to.eq(data.name);
      expect(res.body.gender).to.eq(data.gender);
      expect(res.body.status).to.eq(data.status);
    }).then((res)=>{
      const res_id = res.body.id;
      cy.request({
        method: "GET",
        url: "https://gorest.co.in/public/v2/users/"+res_id,
        headers: {
          authorization: accessToken
        }
      }).then((res)=>{
        expect(res.body.id).to.eq(res_id);
      })
    });
  });*/
});
