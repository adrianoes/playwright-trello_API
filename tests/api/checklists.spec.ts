import { test, expect } from '@playwright/test';
import { createBoard, createCard, createChecklist, createList, deleteBoard, deleteCard, deleteChecklist } from '../supports/commands';
import fs from 'fs';

require('dotenv').config()

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

test.beforeEach(async ({ request }) => {
  await createBoard(request)
  await createList(request)
  await createCard(request)
});

test.afterEach(async ({ request }) => {
  await deleteCard(request)
  await deleteBoard(request)
});

test.describe('checklists', () => {
  test('Create a checklist', async ({ request }) => {

    const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
    const card_id = body.card_id
    const list_id = body.list_id
    const board_id = body.board_id
    const responseCCL = await request.post(`/1/checklists?idCard=${card_id}&key=${key}&token=${token}`, {
      data: {
        name: "myChecklist123"
    }
    });
    const responseBodyCCL = await responseCCL.json()
    expect(responseCCL.status()).toEqual(200)
    console.log(responseBodyCCL.name)
    fs.writeFileSync('tests/fixtures/testdata.json',JSON.stringify({
      board_id: board_id,
      list_id: list_id,
      card_id: card_id,
      checklist_id: responseBodyCCL.id
    }), "utf8");

    await deleteChecklist(request)
  })

  test('Get a checklist', async ({ request }) => {
    await createChecklist(request)

    const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
    const checklist_id = body.checklist_id
    const responseGCL = await request.get(`/1/checklists/${checklist_id}?key=${key}&token=${token}`);
    const responseBodyGCL = await responseGCL.json()
    expect(responseGCL.status()).toEqual(200)    
    console.log(responseBodyGCL.name)

    await deleteChecklist(request)
  })

  test('Update a checklist - name', async ({ request }) => {
    await createChecklist(request)
    
    const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
    const checklist_id = body.checklist_id
    const responseUCL = await request.put(`/1/checklists/${checklist_id}?key=${key}&token=${token}`, {
      data: {
        name: "myChecklist2"
    }
    });
    const responseBodyUCL = await responseUCL.json()
    expect(responseUCL.status()).toEqual(200)    
    console.log(responseBodyUCL.name)

    await deleteChecklist(request) 
  })

  test('Delete a checklist', async ({ request }) => {

    await createChecklist(request)
    
    const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
    const checklist_id = body.checklist_id
    const responseDCL = await request.delete(`/1/checklists/${checklist_id}?key=${key}&token=${token}`);
    expect(responseDCL.status()).toEqual(200)
  })
})

