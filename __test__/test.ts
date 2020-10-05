import { ClientFunction, Selector } from 'testcafe';

fixture`Getting Started`.page`http://localhost:3000`;

test("Check Link to Tech", async t => {
  const Header = Selector("header nav li:nth-child(4)");
  const getLocation = ClientFunction(() => document.location.href);
  await t.click(Header);

  await t.expect(getLocation()).contains("category/2");
});
