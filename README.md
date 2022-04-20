# Persons management 👥

The project goal is to manage persons information that are coming from pipedrive API and allow users to see a list of persons, filter de the list by query string, add and remove persons and to see person detailed information. 

# Project set up 

For security reasons and to avoid exposing sensitive data, the API_KEY and API_DOMAIN are set in a `.env` file, so to run the project locally you have to create the `.env` file and set the values as follows: 

```bash
REACT_APP_API_KEY = 'PIPEDRIVE_API_KEY'
REACT_APP_API_DOMAIN = 'PIPEDRIVE_ACCOUNT_DOMAIN'
```
# Tech stack 

- API data management :  [React-query](https://react-query.tanstack.com/)
- HTTP Client: [Axios](https://axios-http.com/)
- JS Framework : [React](https://reactjs.org/)
- Test: [Testing library](https://testing-library.com/docs/)
- UI component library: [Chakra-UI](https://chakra-ui.com/)
- Icon library: [React-icons](https://react-icons.github.io/react-icons/)
- Commit styling: [Devmoji](https://github.com/folke/devmoji)
- Mock API for tests: [msw]()

# Implementation Comments

Since I couldn't find the exact icons used in the provided mock ups I'm using the Material Design icons available in the `react-icons` lib. 

Since I was not able to inspect the mock ups all UI it's an eye approximation of the provided designs.

This are the keys generated for the custom fields (`groups` and `assistant`) and they are unique to my pipedrive account/domain.

```typescript
 '73d17c3f4d3c8a3856179466873d81a19b931b68'?: string;
  a4329aa33eb3484ce969c8ea9955d7c6a3d2b954?: string;
```

In a production env we would implement the authO flow, preventing the creation of the `.env` file 
### Improvements
- Better abstraction for axios and react query fetch logic
- Use React router to handle routes and that way when modal is opened a query string is added to the app url, which will also prevent the need of the setState to store selected personID. 
- Change pagination strategy to be a infinity scroll 
    - Use InterceptorAPI to get when last object is on screen to trigger nextPage 
    - Use react query useInfinityQuery 
    - Use React Virtual library to virtualize list 

- Validate phone number format before enabling the add person API call
- Handle errors
- Tae advantage of React query to do optimist updates