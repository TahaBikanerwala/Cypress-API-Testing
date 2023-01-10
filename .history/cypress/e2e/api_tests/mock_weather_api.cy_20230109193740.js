
describe('Mocking API which is down',()=>{
    it("Mocking weather API",()=>{
        cy.visit("https://gorest.co.in/");
        cy.intercept('GET','/weather',{fixture: 'user_details.json'}).as('weather');
        cy.wait('@weather')
    })
        
    it("Mocking weather API",()=>{
        cy.visit("https://gorest.co.in/");
        cy.intercept('GET','/weather',{fixture: 'user_details.json'}).as('weather');
        cy.wait('@weather')
    })
})