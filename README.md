# Country Sort

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
git clone https://github.com/hudilong/country-sort.git
```

2. Navigate to the project directory:

```bash
cd country sort
```

3. Start the project using Docker:

```bash
docker-compose up --build
```

## Usage

1. Open a web browser and navigate to [http://localhost:8080](http://localhost:8080).
2. Select the difficulty and sorting criteria (alphabetical, population, area) from the options.
3. Play the game by dragging and dropping flags to arrange them in the correct order.
4. View highscores and track your progress.

## Docker Configuration

Both the client and server components are Dockerized for easy deployment. The `docker-compose.yml` file contains configurations for running the entire application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

-   REST Countries API for providing country information and flags.
-   DND Kit for enabling drag and drop functionality.
