import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173";
test.describe("Home page", ()=> {

  test.beforeEach(async({page})=>{
    await page.goto(BASE_URL);
  });

  test("Has home page title, header, todo form and todo list title", async ({page})=> {
    await expect(page).toHaveTitle("Todo List App");

    const header = page.locator("Header");
    await expect(header).toContainText("To Do App");

    const todoForm = page.getByTestId("todoForm");
    await expect(todoForm).toHaveCount(1);

    const todoInput = page.getByPlaceholder("Add task");
    await expect(todoInput).toBeVisible();

    const todoButton = page.getByRole("button");
    await expect(todoButton).toBeVisible();

    const todoListTitle = page.getByTestId("todoListTitle");
    await expect(todoListTitle).toContainText("Today's Tasks");
  });
});

test.describe("Create and update functionality", ()=>{
  test.beforeEach(async({page})=>{
    //load page
    await page.goto(BASE_URL);

    //add item
    const input = page.getByPlaceholder("Add task");
    await input.fill("Learn react");
    await page.getByRole("button").click();
  });
  test.afterEach(async({page})=>{
    //remove last item
    const deleteButton = page.getByTestId("DeleteIcon").nth(-1);
    await deleteButton.click();
  })
  test("Adds a todo", async ({page})=>{
    const input = page.getByPlaceholder("Add task");
    const lastTodo = page.getByTestId("todoItemText").nth(-1);
    await expect(lastTodo).toHaveText("Learn react");
    await expect(input).toBeEmpty();
  });

  test("Updates a todo", async ({page}) => {
    // check current progress text
    const currentUpdateText = page.getByTestId("todoItemProgress").nth(-1);
    await expect(currentUpdateText).toHaveText("In Progress");

    //click complete button
    const updateButton = page.getByTestId("CheckCircleIcon").nth(-1);
    await updateButton.click();

    // check updated progress text
    await expect(currentUpdateText).toHaveText("Done");
  });
});

test.describe("Delete functionality", ()=>{
  test("Deletes a todo", async({page})=>{
    //load page
    await page.goto(BASE_URL);

    //create item
    const input = page.getByPlaceholder("Add task");
    await input.fill("Learn react");
    await page.getByRole("button").click();
    await page.waitForTimeout(1000);

    //check count
    const todoItems = page.getByTestId("todoItem");
    const oldTodoCount = await todoItems.count();

    //delete item
    const deleteButton = page.getByTestId("DeleteIcon").nth(-1);
    await deleteButton.click();
    await page.waitForTimeout(1000);

    //verify new count
    const newTodoCount = await todoItems.count();
    expect(oldTodoCount-newTodoCount).toEqual(1);
  });
});
