
describe('Mocking API which is down',()=>{
    it("Mocking weather API",()=>{
        cy.visit("https://gorest.co.in/");
        cy.intercept({
            path: '/weather'
        }).as('weather');
        cy.wait('@weather').then((inter)=>{
            cy.log(JSON.stringify(inter));
        })
    })

    it("Mocking weather API",()=>{
        cy.visit("https://jsonplaceholder.typicode.com/");
        cy.intercept('GET','/posts',{fixture: 'user_details.json'}).as('posts');
        cy.wait('@posts')
    })
})