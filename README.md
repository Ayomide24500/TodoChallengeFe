# todochallenge
todo project

**Overview**

This project is a simple task manager built with React. It allows users to create tasks, mark them as in progress or completed, and view the tasks sorted by category.

**Features**

- Create new tasks
- Mark tasks as in progress or completed
- View tasks sorted by category
  
**Installation**
To run this project locally, follow these steps:
git clone <repository-url>
cd <project-directory>
npm install
npm run dev

```Typescript
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IoCreateSharp } from "react-icons/io5";
import moment from "moment";
import { createTask } from "./Api/task";

const App = () => {
  //code here
};
```

**Url**
```https://todo-challenge-first.vercel.app/```

**Dependencies**
This project uses the following dependencies:

react: Typescript library for building user interfaces.
@formkit/auto-animate/react: Library for automating animations in React.
react-icons/io5: Icon library for React components.
moment: Library for parsing, validating, manipulating, and formatting dates and times in JavaScript.

**Usage**
Launch the application by running npm start.
Create tasks by clicking on the "+" icon in the "Tasks" section.
Mark tasks as in progress or completed by clicking on the corresponding button.
View tasks sorted by category.

**Contributing**
Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.
  
