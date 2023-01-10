
describe('Mocking API which is down',()=>{
    it("Mocking weather API",()=>{
        cy.visit("https://www.metaweather.com");
        cy.intercept('GET','/weather/',{fixture: "user_details.json"});

    })
})