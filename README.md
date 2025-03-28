# Pokémon React App

Welcome to the **Pokémon React App**, a dynamic Pokédex built using **React**! This web application allows users to explore various Pokémon, search and filter them by various attributes, and sort the list based on different criteria. The app provides a visually appealing and responsive interface, making it easy to interact with and discover new Pokémon.

## Features

- **Search Functionality**: Easily search for Pokémon by name.
- **Advanced Filters**: Filter Pokémon by primary type, secondary type, height, weight, capture rate, and legendary status.
- **Sorting Options**: Sort Pokémon by number, name, HP, attack, defense, speed, height, weight, and capture rate.
- **Pagination**: Browse through large datasets with pagination controls.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Type-based Styling**: Pokémon cards are styled based on their primary type, providing a visually engaging experience.

## Tech Stack

This application is built using the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling routing between pages.
- **CSS**: For styling the components and ensuring a responsive design.
- **Axios**: A promise-based HTTP client used to fetch data (mock data is used in this project).
- **React Hooks**: To manage state and side-effects in the app (e.g., `useState`, `useEffect`).

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install the dependencies**:

   If you don't have `npm` or `yarn` installed, please install them first. Then, run:

   ```bash
   npm install
   ```

3. **Start the application**:

   After the installation is complete, run the following command to start the app:

   ```bash
   npm start
   ```

   This will launch the app in your browser at `http://localhost:3000`.

## File Structure

The project follows a simple structure to ensure easy scalability and maintainability:

```
/src
  /components
    /Pokedex
      Pokedex.js       # Main component for displaying Pokémon data
      Pokedex.css      # Styles specific to the Pokedex component
  App.js               # Root App component with routing and layout
  App.css              # Global styles for the entire app
  index.js             # Entry point for the React app
  index.html           # Basic HTML file for rendering the React app
```

### Key Files:

- **`App.js`**: Contains the main structure of the app, including routing and the overall layout.
- **`Pokedex.js`**: Handles fetching and displaying Pokémon data, including search and filter functionality.
- **`Pokedex.css`**: Styles the Pokedex component and Pokémon cards.
- **`App.css`**: Global styles applied across the app.
- **`index.js`**: Initializes the React app and renders it to the DOM.
- **`index.html`**: The base HTML file for the React app.

## How to Use

### Search Pokémon:
- Type the name of a Pokémon into the search bar, and the list will automatically update to show matching results.

### Apply Filters:
- Use the filter options to narrow down the list of Pokémon by their primary type, secondary type, height, weight, capture rate, and whether they are legendary or not.

### Sort Pokémon:
- You can sort the Pokémon by various attributes, including their number, name, HP, attack, defense, speed, height, weight, or capture rate.

## Example Screenshots

![image](https://github.com/user-attachments/assets/399fc233-265d-4d4f-90f7-5247369b36a2)



