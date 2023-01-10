
describe('Mocking API which is down',()=>{
    it("Mocking weather API",()=>{
        cy.visit("https://gorest.co.in/public/v2/users");
        cy.intercept('GET','/weather/',{fixture: 'user_details.json'}).as('posts');
        cy.wait('@posts')

    })
})