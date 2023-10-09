# Drag and Drop Flags Game

## Overview

This web application is a drag and drop game built using React (with Vite), a Node.js server, and a PostgreSQL database. The game utilizes the REST Countries API to fetch information about countries and their flags. The objective of the game is to arrange the flags in the correct order based on selected criteria (alphabetical, descending population, or descending area).

## Features

-   Random selection of 3 to 5 countries based on chosen difficulty level.
-   Drag and drop functionality to arrange flags.
-   Different sorting options: alphabetical, descending population, and descending area.
-   Highscores are saved in a PostgreSQL database via the Node.js server.

## Technologies Used

-   **Frontend**: React (with Vite), DND Kit for drag and drop functionality.
-   **Backend**: Node.js server.
-   **Database**: PostgreSQL.

## Getting Started

### Prerequisites

-   Docker and Docker Compose must be installed on your system.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/drag-and-drop-flags-game.git
```

2. Navigate to the project directory:

```bash
cd drag-and-drop-flags-game
```

3. Start the project using Docker:

```bash
docker-compose up --build
```

## Usage

1. Open a web browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Play the game by dragging and dropping flags to arrange them in the correct order.
3. Select the sorting criteria (alphabetical, population, area) from the options.
4. View highscores and track your progress.

## Docker Configuration

Both the client and server components are Dockerized for easy deployment. The `docker-compose.yml` file contains configurations for running the entire application.

### Custom Docker Configurations (if any)

If there are any additional configurations specific to your Docker setup, please make sure to include them here.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Description of your changes'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

-   REST Countries API for providing country information and flags.
-   DND Kit for enabling drag and drop functionality.
