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
    let listId1 = null;
    let listId2 = null;
    let cardid = null;
    
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

    it('Get Boards',()=>{
        cy.request({
            method: "GET",
            url: baseURL+"/1/members/me/boards?fields=name,url&key="+apiKey+"&token="+token_val
        })
    })

    it('Create List ToDo',()=>{
        cy.request({
            method: "POST",
            url: baseURL+"/1/boards/"+boardid+"/lists/?name=ToDo&key="+apiKey+"&token="+token_val
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq("ToDo")
            expect(res.body.idBoard).to.eq(boardid)
            listId1 = res.body.id
            cy.log(JSON.stringify(res))
        })
    })

    it('Create List Done',()=>{
        cy.request({
            method: "POST",
            url: baseURL+"/1/boards/"+boardid+"/lists/?name=Done&key="+apiKey+"&token="+token_val
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq("Done")
            expect(res.body.idBoard).to.eq(boardid)
            listId2 = res.body.id
            cy.log(JSON.stringify(res))
        })
    })

    it('Get all Lists',()=>{
        cy.request({
            method: "GET",
            url: baseURL+"/1/boards/"+boardid+"/lists/?key="+apiKey+"&token="+token_val
        }).then((res)=>{
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))
        })
    })

    it('Create a Card on ToDo List',()=>{
        cy.request({
            method: "POST",
            url: baseURL+"/1/cards/?name=Learn Postman&key="+apiKey+"&token="+token_val+"&desc=This is just a demo&idList="+listId1
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.desc).eq("This is just a demo")
            expect(res.body.idBoard).to.eq(boardid)
            expect(res.body.idBoard).to.eq(boardid)
            cardid = res.body.id
            cy.log(JSON.stringify(res))
        })
    })

    it('Update a Card from ToDo List to Done',()=>{
        cy.request({
            method: "PUT",
            url: baseURL+"/1/cards/"+cardid+"?key="+apiKey+"&token="+token_val+"&idList="+listId2
        }).then((res)=>{
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res))
        })
    })

    it('Get a Card',()=>{
        cy.request({
            method: "GET",
            url: baseURL+"/1/cards/"+cardid+"?key="+apiKey+"&token="+token_val
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.desc).eq("This is just a demo")
            cy.log(JSON.stringify(res))
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