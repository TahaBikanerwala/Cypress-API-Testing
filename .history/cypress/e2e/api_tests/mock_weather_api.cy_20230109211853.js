
describe('Mocking API which is down',()=>{
    it("Mocking weather API",()=>{
        // cy.visit("https://jsonplaceholder.typicode.com");
        cy.intercept({
            url: 'https://jsonplaceholder.typicode.com',
            path: '/posts',
            method:'POST',
           
        }).as('posts');
        cy.wait('@posts').then((inter)=>{
            cy.log(JSON.stringify(inter));
        })
    })

    it("Mocking weather API",()=>{
        cy.visit("https://jsonplaceholder.typicode.com/");
        cy.intercept('GET','/posts',{fixture: 'user_details.json'}).as('posts');
        cy.wait('@posts')
    })
})