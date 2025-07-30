/* 

<!-- Create a simple tabbed interface using Vanilla JavaScript, HTML and CSS.
The tabs should switch content when clicked and have a visual indication for the active tab. Design the structure and functionality of these tabs.
Requirements:
- Create Three tabs labeled "Tab 1," "Tab 2," and "Tab 3".
- Implement functionality such that clicking on a tab changes the displayed
content and visibly identifies the active tab.
- Ensure code readability, modularity, and appropriate comments.
Bonus:
Implement a default tab that is active on page load.
- Consider scalability and discuss how you might handle content sections dynamically.
adding more tabs or

*/

const tabsData = [
  {
    id: "tab_1",
    title: "TAB 1",
    content: "You are viewing the content from FIRST Tab",
  },
  {
    id: "tab_2",
    title: "TAB 2",
    content: "You are viewing the content from SECOND Tab",
  },
  {
    id: "tab_3",
    title: "TAB 3",
    content: "You are viewing the content from THIRD Tab",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  //set the first Tab as default active tab
  let activeTab = tabsData[0].id;
  const renderTabs = () => {
    //select the tabContainer & contentContainer
    const tabContainer = document.querySelector("#tabContainer");
    const contentContainer = document.querySelector("#contentContainer");

    tabsData.forEach((tab) => {
      //creating tabs
      const tabButton = document.createElement("button");
      tabButton.textContent = tab?.title;
      tabButton.className = "tabLink";
      tabButton.setAttribute("data-tab", tab?.id);
      tabContainer.appendChild(tabButton);

      //creating content for each tabs
      const tabContent = document.createElement("div");
      tabContent.innerHTML = `<h1>${tab?.title}</h1><p>${tab?.content}</p>`;
      tabContent.className = "tabContent";
      tabContent.id = tab?.id;
      contentContainer.appendChild(tabContent);
    });

    //Adding one event listener on the parent of all tab-buttons (tabContainer) to handle tab switching.
    tabContainer.addEventListener("click", (e) => {
      // /checks if the clicked element is a tab button and has the class tabLink
      if (e.target.matches(".tabLink")) {
        const tabId = e.target.getAttribute("data-tab");
        if (tabId != activeTab) {
          openTab(tabId);
          activeTab = tabId;
        }
      }
    });
  };

  const openTab = (tabId) => {
    const tabs = document.querySelectorAll(".tabLink");
    const tabContents = document.querySelectorAll(".tabContent");

    //Deactivating all tabs and contents by removing the active class.
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    tabContents.forEach((tab) => {
      tab.classList.remove("active");
    });

    //activating the newly clicked tab by adding the active class.
    document.getElementById(tabId).classList.add("active");
    document.querySelector(`button[data-tab=${tabId}]`).classList.add("active");
  };

  renderTabs();
  //by default
  document.getElementById(activeTab).classList.add("active");
  document
    .querySelector(`button[data-tab=${activeTab}]`)
    .classList.add("active");
});
