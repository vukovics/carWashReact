import axios from 'axios';
export const companyService = {
   getCompanies
};

async function getCompanies() {
    let url = 'http://localhost:8000/api/allCompanies?cityId=1';
    const response = await axios.get(url);
    return response;
}