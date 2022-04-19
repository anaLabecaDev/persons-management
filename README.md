# Persons management 👥

The project goal is to manage persons information that are coming from pipedrive API and allow users to see a list of persons, filter de the list by query string, add and remove persons and to see person detailed information. 

# Project set up 

For security reasons and to avoid exposing sensitive data, the API_KEY and API_DOMAIN are set in a `.env` file, so to run the project locally you have to create the `.env` file and set the values as follows: 

```bash
REACT_APP_API_KEY = 'PIPEDRIVE_API_KEY'
REACT_APP_API_DOMAIN = 'PIPEDRIVE_ACCOUNT_DOMAIN'
```
# Tech stack 

- API data management :  [React-query]([https://react-query.tanstack.com/](https://react-query.tanstack.com/))
- HTTP Client: [Axios]([https://axios-http.com/](https://axios-http.com/))
- JS Framework : [React]([https://reactjs.org/](https://reactjs.org/))
- Test: [Testing library]([https://testing-library.com/docs/](https://testing-library.com/docs/))
- UI component library: [Chakra-UI]([https://chakra-ui.com/](https://chakra-ui.com/))
- Icon library: [React-icons](https://react-icons.github.io/react-icons/)
- Commit styling: [Devmoji](https://github.com/folke/devmoji)

# Implementation details

Since I couldn't find the exact icons used in the provided mock ups I'm using the Material Design icons available in the `react-icons` lib. 

Since I was not able to inspect the mock ups all UI it's an eye approximation of the provided designs.