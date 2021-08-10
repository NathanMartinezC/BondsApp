# Instructions
## Backend

- The first step is create and activate a virtual environment, then since repository root folder:

```
virtualenv env
source env/bin/activate
```

- For installing dependencies:

```
pip install -r backend/requirements.txt
```

- For running Django app:

```
cd backend
python manage.py migrate
python manage.py runserver
```

## Frontend

- Install project dependencies and run react application:

```
cd frontend
npm install
npm start
```