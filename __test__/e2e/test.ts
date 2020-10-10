import { ClientFunction, Selector } from 'testcafe';

fixture`ヘッダーのリダイレクトのテスト`.page`http://localhost:3000`;

const getLocation = ClientFunction(() => document.location.href);

test("Techページへのリンクをクリックし、Techページへリダイレクトする", async t => {
  const techLink = Selector("header nav li:nth-child(4)");
  await t.click(techLink);
  await t.expect(getLocation()).contains("category/2");
});

test("Aboutページへのリンクをクリックし、Aboutページへリダイレクトする", async t => {
  const aboutLink = Selector("header nav li:nth-child(2)");
  await t.click(aboutLink);
  await t.expect(getLocation()).contains("about");
});

test("Blogページへのリンクをクリックし、Blogページへリダイレクトする", async t => {
  const blogLink = Selector("header nav li:nth-child(3)");
  await t.click(blogLink);
  await t.expect(getLocation()).contains("category/3");
});