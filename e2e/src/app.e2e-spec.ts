import { AppPage } from "./app.po";
import {
  browser,
  by,
  element,
  logging,
  ElementFinder,
  ElementArrayFinder,
} from "protractor";
import { employees } from "./mock-data";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it("create employee button should work", () => {
    expect(element(by.className("modal")).isPresent()).toBeFalsy(
      "The modal window should not appear right now"
    );
    element(by.buttonText("Add Employee")).click();
    expect(element(by.className("modal")).isPresent()).toBeTruthy(
      "The modal window should appear now"
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});

export class Base {
  /* Methods shared by addPaste and viewPaste */

  getInputTitle(): ElementFinder {
    return element(by.name("first_name"));
  }

  getInputLanguage(): ElementFinder {
    return element(by.name("last_name"));
  }

  getInputPaste(): ElementFinder {
    return element(by.name("email"));
  }
}
