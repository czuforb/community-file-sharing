# Community file sharing website

I had the opportunity to build a fairly complex app for a non profit organiozation. They wanted a website, where their members can upload and download documents and files about their events and best practices.

## Features implemented

- Users can sign up to the website
- Users can reset their password via email
- Users can log in
- Public and restricted documents and categories
- Admin panel
- Admins have to approve documents/users/annuncements
- Admin can edit and delete uploaded files, called documents
- Admins can create categories
- Users can upload files, called documents
- Users can make announcements

## Technologies used

- Next.js
- GraphQL
  - GraphQL tools
  - GraphQL shield
- Apollo Server and Apollo Client
  - Apollo micro
  - Apollo micro CORS
- Prisma as ORM
- MySQL
- Formik with Yup validation
- ChakraUI
- MiniO as file storage
- Docker with docker-compose
- NGINX as webserver
  - Certificates from ZeroSSL
- Mailgun for transactional emails

## Remaining tasks

The code is not finished and it's still work in progress beacuse of limited time.

- The code must be refactored, there are a lot of repeated parts - eg. Toast messages
- The code of the Apollo server must be edited for clarity and resolvers must be separated and grouped-
- The copy on the website is just placeholders.
- Still dummy data in the database.
- The whole login/signup system must be implemented with a third party solutions for security reasons.
- MiniO file storage must be more secure.
- MySQL must be more secure - pricinple of least privileg etc.
- Optimize docker-compose file
- Test code, lint code -> introduce CI/CD
- Better ENV variables
- Fix dependecies
