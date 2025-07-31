const accordionData = [
  {
    id: "ac_1",
    title: "Did You Know? About the Sun",
    content:
      "The Sun accounts for 99.86% of the mass in our solar system. It’s so large that about 1.3 million Earths could fit inside it!",
  },
  {
    id: "ac_2",
    title: "Fact: Octopus Intelligence",
    content:
      "Octopuses have nine brains, blue blood, and can taste with their arms. They’re considered one of the smartest invertebrates on Earth.",
  },
  {
    id: "ac_3",
    title: "History: The Great Wall of China",
    content:
      "The Great Wall of China is over 13,000 miles long and took more than 2,000 years to complete. Contrary to popular belief, it’s not visible from space with the naked eye.",
  },
  {
    id: "ac_4",
    title: "Space: Saturn’s Rings",
    content:
      "Saturn’s rings are made mostly of ice particles and range in size from tiny grains to objects as large as a mountain.",
  },
  {
    id: "ac_5",
    title: "Tech: First Website Ever",
    content:
      "The first website ever was created by Tim Berners-Lee in 1991. It’s still live today: http://info.cern.ch/",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const accordionContainer = document.querySelector("#accordion-container");

  accordionData?.forEach((item, index) => {
    //create a section that will contain header and content
    const section = document.createElement("div");
    section.classList.add("accordion-section");

    //create a accordion header
    const sectionHeader = document.createElement("div");
    sectionHeader.classList.add("accordion-header");
    sectionHeader.textContent = item?.title;

    //create a accordion content
    const sectionContent = document.createElement("div");
    sectionContent.classList.add("accordion-content");
    sectionContent.innerHTML = `<div>${item?.content}</div>`;

    //add header and content child to section
    section.appendChild(sectionHeader);
    section.appendChild(sectionContent);

    accordionContainer.appendChild(section);

    //keep the first index open by default
    if (index === 0) {
      section.classList.add("active");
      sectionContent.style.display = "block";
    }
  });

  //handling opening and closing of accordion
  accordionContainer.addEventListener("click", (e) => {
    //find the clicked header
    const header = e.target.closest(".accordion-header");
    if (!header) {
      return;
    }
    //get the full access of parent node or div of header
    const section = header.parentNode;

    //get the content of it
    const content = section.querySelector(".accordion-content");
    //check if it has acive class or not
    const isActive = section.classList.contains("active");

    //after clicking on a accordion, remove all the classes
    document.querySelectorAll(".accordion-section").forEach((sec) => {
      sec.classList.remove("active");
      sec.querySelector(".accordion-content").style.display = "none";
    });

    if (!isActive) {
      section.classList.add("active");
      content.style.display = "block";
    }
  });
});
