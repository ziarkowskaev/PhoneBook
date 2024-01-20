Phone Book Application

1. Users can add new contacts by providing a name and phone number in the respective input fields. When submitted, the contact gets added to the list displayed on the interface.

2. If a contact with the same name already exists, the application prompts the user to update the phone number for that contact. The user can confirm the update, replacing the old number with the new one.

3. Clicking the delete button beside a contact triggers the removes the contact from the database.

4. The application provides notifications for successful updates, additions, or deletion of contacts. It also alerts users if there's an issue while updating or deleting a contact, such as when the information has been removed from the server.


Application is developed using React.js, providing a tool for adding, updating, and deleting contact information.
The application uses Axios, a promise-based HTTP client, to communicate with a JSON server running locally to store contact information.
It employs REST API endpoints to perform CRUD (Create, Read, Update, Delete) operations on the contact database.

React.js for the front-end user interface.

To start application locally

npm run dev

Axios for making HTTP requests to the JSON server.
JSON server as the local database, handling contact information.

Note: Ensure the JSON server is running locally for the application to interact with the database.

npx json-server --port 3001 --watch db.json

The branch "integrated" includes updated files that were used to integrated backend with frontend.
