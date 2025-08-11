const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const allBtn = document.getElementById("all-btn");
const wddBtn = document.getElementById("wdd-btn");
const cseBtn = document.getElementById("cse-btn");

const certificateSection = document.getElementById("certificate");

const buttonCourses = document.querySelector("#buttonsCourses");

const courseDetails = document.querySelector("#course-details");
const titleBox = document.querySelector("#course-details h2");
const closeButton = document.querySelector("#course-details button");

const courseName = document.querySelector("#course-details h3");
const courseCredits = document.querySelector("#credits");
const courseCertificate = document.querySelector("#course-certificate");
const courseInfo = document.querySelector("#detail");
const courseTechnology = document.querySelector("#technology");

const courseCardsContainer = document.createElement("div");
courseCardsContainer.id = "course-cards-container";
certificateSection.appendChild(courseCardsContainer);

displayCourses(courses);

allBtn.addEventListener("click", () => displayCourses(courses));
wddBtn.addEventListener("click", () => {
    const filtered = courses.filter(course => course.subject === "WDD");
    displayCourses(filtered);
});
cseBtn.addEventListener("click", () => {
    const filtered = courses.filter(course => course.subject === "CSE");
    displayCourses(filtered);
});

function displayCourses(courseList) {
    courseCardsContainer.innerHTML = "";

    let totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);

    courseList.forEach(course => {
        const btn = document.createElement("button");
        btn.classList.add("course-btn");
        btn.classList.add(course.completed ? "completed" : "incomplete");

        btn.innerHTML = `${course.subject} ${course.number}`;

        btn.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseCardsContainer.appendChild(btn);
    });

    const creditsDisplay = document.createElement("p");
    creditsDisplay.classList.add("credits-total");
    creditsDisplay.innerText = `Total Credits: ${totalCredits}`;
    courseCardsContainer.appendChild(creditsDisplay);
}


function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p>${course.credits} credits</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technology</strong>: ${course.technology.join(', ')}</p>
    `;

    courseDetails.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}