# Discourse

This is a "Post Feeding app" which gives all general features a discourse app should have and is still underdevelopment.

The backend is completely build on Django using Django Rest Framework, while the frontend is completed using ReactJS.

### Features

- Login/Registration
- Minimal Design
- Create/Edit/Delete Your Posts

- Admin Panel
  - Create/View/Edit/Delete A User
  - Pagination on All post list and Live search 
  - Create/View/Edit/Delete A Post By Any User
  - Publish/Unpublish A Post

## Backend Setup

1. Clone this repository: `https://github.com/maniSHarma7575/Discourse.git`.
2. Change the current directory to `Backend` folder: `cd ./Discourse/Backend/src/`.
3. Create a virutal environment and install all backend dependencies with pipenv: `pipenv install`.
4. Start the virtual environment: `pipenv shell`.
5. Change the working directory to `src` which contains the `manage.py` file: `cd ./src`.
6. Run `python manage.py makemigrations`.
7. Run `python manage.py migrate`.
8. Create a superuser: `python manage.py createsuperuser`
9. Run the server: `python manage.py runserver`.

## Frontend Setup

1. Navigate the current working directory to `landing`: `cd ./Discourse/Frontend/`.
2. Install the all frontend dependencies using npm: `npm install`.
3. Run the server: `npm start`.

**Regrads**

 Manish Sharma
