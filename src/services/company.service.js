import axios from 'axios';
export const companyService = {
    getCompanies,
    getCompanyOffers
};

async function getCompanies() {
    let url = 'http://localhost:8000/api/allCompanies?cityId=1';
    const response = await axios.get(url);
    return response;
}

async function getCompanyOffers(companyId) {
    let url = 'http://localhost:8000/api/company/' + companyId;
    const response = await axios.get(url);
    return response;
}