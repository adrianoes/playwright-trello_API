import { test, expect } from '@playwright/test';
require('dotenv').config()

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

test.describe('checklists', () => {
  test('Create a checklist', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    const board_id = responseBodyCB.id
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    const list_name = 'myList123'
    const responseCL = await request.post(`/1/boards/${board_id}/lists?name=${list_name}&key=${key}&token=${token}`, {});
    const responseBodyCL = await responseCL.json()
    const list_id = responseBodyCL.id
    expect(responseCL.status()).toEqual(200)
    console.log(responseBodyCL.name)

    const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
      data: {
        name: "myCard123"
    }
    });
    const responseBodyCC = await responseCC.json()
    const card_id = responseBodyCC.id
    expect(responseCC.status()).toEqual(200)
    console.log(responseBodyCC.name)

    const responseCCL = await request.post(`/1/checklists?idCard=${card_id}&key=${key}&token=${token}`, {
      data: {
        name: "myChecklist123"
    }
    });
    const responseBodyCCL = await responseCCL.json()
    const checklist_id = responseBodyCCL.id
    expect(responseCCL.status()).toEqual(200)
    console.log(responseBodyCCL.name)

    const responseDCL = await request.delete(`/1/checklists/${checklist_id}?key=${key}&token=${token}`);
    expect(responseDCL.status()).toEqual(200)

    const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
    expect(responseDC.status()).toEqual(200)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Get a checklist', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    const board_id = responseBodyCB.id
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    const list_name = 'myList123'
    const responseCL = await request.post(`/1/boards/${board_id}/lists?name=${list_name}&key=${key}&token=${token}`, {});
    const responseBodyCL = await responseCL.json()
    const list_id = responseBodyCL.id
    expect(responseCL.status()).toEqual(200)
    console.log(responseBodyCL.name)

    const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
      data: {
        name: "myCard123" //Card name is passed in the body, not in the url
    }
    });
    const responseBodyCC = await responseCC.json()
    const card_id = responseBodyCC.id
    expect(responseCC.status()).toEqual(200)
    console.log(responseBodyCC.name)

    const responseCCL = await request.post(`/1/checklists?idCard=${card_id}&key=${key}&token=${token}`, {
      data: {
        name: "myChecklist123"
    }
    });
    const responseBodyCCL = await responseCCL.json()
    const checklist_id = responseBodyCCL.id
    expect(responseCCL.status()).toEqual(200)
    console.log(responseBodyCCL.name)

    const responseGCL = await request.get(`/1/checklists/${checklist_id}?key=${key}&token=${token}`);
    const responseBodyGCL = await responseGCL.json()
    expect(responseGCL.status()).toEqual(200)    
    console.log(responseBodyGCL.name)

    const responseDCL = await request.delete(`/1/checklists/${checklist_id}?key=${key}&token=${token}`);
    expect(responseDCL.status()).toEqual(200)

    const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
    expect(responseDC.status()).toEqual(200)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Update a checklist - name', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    const board_id = responseBodyCB.id
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    const list_name = 'myList123'
    const responseCL = await request.post(`/1/boards/${board_id}/lists?name=${list_name}&key=${key}&token=${token}`, {});
    const responseBodyCL = await responseCL.json()
    const list_id = responseBodyCL.id
    expect(responseCL.status()).toEqual(200)
    console.log(responseBodyCL.name)

    const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
      data: {
        name: "myCard123" //Card name is passed in the body, not in the url
    }
    });
    const responseBodyCC = await responseCC.json()
    const card_id = responseBodyCC.id
    expect(responseCC.status()).toEqual(200)
    console.log(responseBodyCC.name)

    const responseCCL = await request.post(`/1/checklists?idCard=${card_id}&key=${key}&token=${token}`, {
      data: {
        name: "myChecklist123"
    }
    });
    const responseBodyCCL = await responseCCL.json()
    const checklist_id = responseBodyCCL.id
    expect(responseCCL.status()).toEqual(200)
    console.log(responseBodyCCL.name)

    const responseUCL = await request.put(`/1/checklists/${checklist_id}?key=${key}&token=${token}`, {
      data: {
        name: "myChecklist2"
    }
    });
    const responseBodyUCL = await responseUCL.json()
    expect(responseUCL.status()).toEqual(200)    
    console.log(responseBodyUCL.name)

    const responseDCL = await request.delete(`/1/checklists/${checklist_id}?key=${key}&token=${token}`);
    expect(responseDCL.status()).toEqual(200) 

    const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
    expect(responseDC.status()).toEqual(200)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })

  test('Delete a checklist', async ({ request }) => {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    const board_id = responseBodyCB.id
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    const list_name = 'myList123'
    const responseCL = await request.post(`/1/boards/${board_id}/lists?name=${list_name}&key=${key}&token=${token}`, {});
    const responseBodyCL = await responseCL.json()
    const list_id = responseBodyCL.id
    expect(responseCL.status()).toEqual(200)
    console.log(responseBodyCL.name)

    const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
      data: {
        name: "myCard123"
    }
    });
    const responseBodyCC = await responseCC.json()
    const card_id = responseBodyCC.id
    expect(responseCC.status()).toEqual(200)
    console.log(responseBodyCC.name)

    const responseCCL = await request.post(`/1/checklists?idCard=${card_id}&key=${key}&token=${token}`, {
      data: {
        name: "myChecklist123"
    }
    });
    const responseBodyCCL = await responseCCL.json()
    const checklist_id = responseBodyCCL.id
    expect(responseCCL.status()).toEqual(200)
    console.log(responseBodyCCL.name)

    const responseDCL = await request.delete(`/1/checklists/${checklist_id}?key=${key}&token=${token}`);
    expect(responseDCL.status()).toEqual(200)

    const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
    expect(responseDC.status()).toEqual(200)

    const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
    expect(responseDB.status()).toEqual(200)
  })
})

