import 'dotenv/config';
const baseUrl = process.env.BASE_URL;

const lighthousePages = [
    {
        name: 'Login',
        url: `${baseUrl}/login`,
    },
    {
        name: 'Signup',
        url: `${baseUrl}/signup`,
    },
    {
        name: 'Importers',
        url: `${baseUrl}/account/importers`,
    },
    {
        name: 'Billing',
        url: `${baseUrl}/account/billing`,
    },
    {
        name: 'Team Members',
        url: `${baseUrl}/account/team-members`,
    },
    {
        name: 'Importer Style Preferences',
        url: `${baseUrl}/account/importer-style-preferences`,
    },
    {
        name: 'Account',
        url: `${baseUrl}/account/`,
    },
];

export default lighthousePages;