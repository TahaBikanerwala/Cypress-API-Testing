/// <reference types = "Cypress" />
function getBoardName(){
       
        let boardName = "My Board "+ parseInt(Math.random()*10000);
        return boardName;
    }
describe('Test for creating an board',()=>{
    const baseURL = "https://api.trello.com";
    const apiKey = "e812196d03c6175edf6b0cb8c219361c";
    const token_val = "2cfe8b515f2f61c03d177068d26ea7ce843a3a12bddaea333cd2daebb034015f";
    let boardid = null;
    let boardName = getBoardName();
    
    it('Create a Board', () => {
        boardName = getBoardName();
        cy.request({
            method: 'POST',
            url: baseURL+"/1/boards/?name="+boardName+"&key="+apiKey+"&token="+token_val+"&defaultLists=false",
        }).then((res)=>{
            expect(res.status).to.eql(200)
            expect(res.body.name).to.equal(boardName)
            boardid = res.body.id
        })
    });

    it.skip('Get Boards',()=>{
        cy.request({
            method: "GET",
            url: baseURL+"1/members/me/boards?fields=name,url&key="+apiKey+"&token="+token_val
        })
    })

    it('Create List',()=>{
        cy.request({
            method: "POST",
            url: baseURL+"1/members/me/boards/"+boardid+"/lists/?name=ToDo&key="+apiKey+"&token="+token_val
        })
    })

    it('Delete a Board', () => {
        boardName = getBoardName();
        cy.request({
            method: 'DELETE',
            url: baseURL+"/1/boards/"+boardid+"/?fields=name,url&key="+apiKey+"&token="+token_val,
        }).then((res)=>{
            expect(res.status).to.eql(200)
        })
    });
})