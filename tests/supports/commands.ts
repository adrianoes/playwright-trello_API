require('dotenv').config()
import { APIRequestContext, expect } from '@playwright/test';
import fs from 'fs';

const key = process.env.TRELLO_KEY
const token = process.env.TRELLO_TOKEN

export async function createBoard(request: APIRequestContext) {
    const board_name = 'myBoard123'
    const responseCB = await request.post(`/1/boards/?name=${board_name}&key=${key}&token=${token}`, {});
    const responseBodyCB = await responseCB.json()
    expect(responseCB.status()).toEqual(200)
    console.log(responseBodyCB.name)

    fs.writeFileSync('tests/fixtures/testdata.json',JSON.stringify({
      board_id: responseBodyCB.id
    }), "utf8");

    // fs.writeFile('tests/fixtures/testdata.json', JSON.stringify({
    //   board_id: responseBodyCB.id
    // }), err => { if (err) console.log("Error writing file:", err); });
}

export async function deleteBoard(request: APIRequestContext) {
  const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
  const board_id = body.board_id
  console.log(board_id)
  const responseDB = await request.delete(`/1/boards/${board_id}?key=${key}&token=${token}`);
  expect(responseDB.status()).toEqual(200)
}

export async function createList(request: APIRequestContext) {
  const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
  const board_id = body.board_id
  console.log(board_id)
  const list_name = 'myList123'
  const responseCL = await request.post(`/1/boards/${board_id}/lists?name=${list_name}&key=${key}&token=${token}`, {});
  const responseBodyCL = await responseCL.json()
  // const list_id = responseBodyCL.id //trello has no delete list method, só we don't need list id since we will delete the whole board instead to keep environment clean
  expect(responseCL.status()).toEqual(200)
  console.log(responseBodyCL.name)

  fs.writeFileSync('tests/fixtures/testdata.json',JSON.stringify({
    board_id: board_id,
    list_id: responseBodyCL.id
  }), "utf8");
}

export async function createCard(request: APIRequestContext) {
  const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
  const list_id = body.list_id
  const board_id = body.board_id
  console.log(list_id)
  const responseCC = await request.post(`/1/cards?idList=${list_id}&key=${key}&token=${token}`, {
    data: {
      name: "myCard123"
  }
  });
  const responseBodyCC = await responseCC.json()
  expect(responseCC.status()).toEqual(200)
  console.log(responseBodyCC.name)

  fs.writeFileSync('tests/fixtures/testdata.json',JSON.stringify({
    board_id: board_id,
    list_id: list_id,
    card_id: responseBodyCC.id
  }), "utf8");
}

export async function deleteCard(request: APIRequestContext) {
  const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
  const card_id = body.card_id
  const responseDC = await request.delete(`/1/cards/${card_id}?key=${key}&token=${token}`);
  expect(responseDC.status()).toEqual(200)
}

export async function createChecklist(request: APIRequestContext) {
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
  const checklist_id = responseBodyCCL.id
  expect(responseCCL.status()).toEqual(200)
  console.log(responseBodyCCL.name)

  fs.writeFileSync('tests/fixtures/testdata.json',JSON.stringify({
    board_id: board_id,
    list_id: list_id,
    card_id: card_id,
    checklist_id: responseBodyCCL.id
  }), "utf8");
}

export async function deleteChecklist(request: APIRequestContext) {
  const body = JSON.parse(fs.readFileSync('tests/fixtures/testdata.json', "utf8"))
  const checklist_id = body.checklist_id
  const responseDCL = await request.delete(`/1/checklists/${checklist_id}?key=${key}&token=${token}`);
  expect(responseDCL.status()).toEqual(200)
}