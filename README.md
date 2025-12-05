## Interactive Line Chart

[**💻 View Live Demo on GitHub Pages**](https://lidakl.github.io/interactive-line-chart/)

This project is an interactive line chart designed for visualizing A/B test statistics.

---

### Project Overview

The [Visx](https://visx.airbnb.tech/) library was selected for data visualization. Visx utilizes SVG rendering technology, providing a flexible set of components that can be composed and customized effectively.

---

### Implemented features

The chart components are generic implementations that are decoupled from any specific data structure.

*   Display a conversion rate (conversionRate) line chart for all variations, showing all values as percentages.
*   On hover, show a vertical line and a popup with daily data.
*   At least one variation must always be selected.
*   When variations are toggled, both X and Y axes must adapt automatically to the visible data range.
*   Display all values as percentages.
*   Responsive layout for screens between 671 px and 1300 px.
*   Controls:
    *   Variations selector (choose which lines to display)
    *   Day / Week selector

---

### Bonus Features

*   Line style selector (Line, Smooth, Area)
*   Light / Dark theme toggle

---

### Local Installation and Setup

Ensure you have [Node.js](https://nodejs.org/en) installed, which includes the `npm` package manager. Alternatively, you can use `yarn` or `pnpm`.

#### Step-by-Step Guide

**1. Clone the Repository**

Open your terminal (Command Prompt, Git Bash, or integrated terminal in your IDE) and execute the following command to download the source code. Please replace `yourusername/your-repo-name.git` with the actual URL of your GitHub repository, **and update the link at the very top of this file**:

```bash
git clone github.com
```
**2. Navigate to the Project Directory**

Change your current directory to the newly cloned project folder:

```bash
cd your-repo-name
```
**3. Install Dependencies**

Install all required libraries and packages listed in the  `package.json`  file using one of the following commands:

```bash
# If you are using npm (default recommendation)
npm install

# Or if you prefer Yarn
yarn install

# Or if you use pnpm
pnpm install
```
**4. Run the Application in Development Mode**

After successfully installing all dependencies, you can start the project. In development mode, Vite launches a local server with Hot Module Replacement (HMR), which is ideal for development workflows:

Execute one of the following commands:

```bash
# To run with npm
npm run dev

# To run with Yarn
yarn dev

# To run with pnpm
pnpm dev
```
**5. View the Application in Your Browser**

Once the server starts, your terminal will display the local address where the application is accessible. Typically, this is:

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```