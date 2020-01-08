import axios from 'axios';
export const companyService = {
  getCompanies,
  getCompanyOffers,
  getSelectedCompanyById,
  addOffer,
  getOwnerCompanies,
  getSingleCompanyOffer,
  deleteCompanyOffer,
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

async function getOwnerCompanies(userId) {
  let url = 'http://localhost:8000/api/ownerCompanies/' + userId;
  const response = await axios.get(url);
  return response;
}

async function getSelectedCompanyById(companyId) {
  let url = 'http://localhost:8000/api/companyInfo/' + companyId;
  const response = await axios.get(url);
  return response;
}
async function addOffer(offer) {
  let url = 'http://localhost:8000/api/booking';
  const response = await axios.post(url, offer);
  return response;
}

async function getSingleCompanyOffer(company_id) {
  let url = 'http://localhost:8000/api/offer/' + company_id;
  const response = await axios.get(url);
  return response.data.offers;
}

async function deleteCompanyOffer(offer_id) {
  let url = 'http://localhost:8000/api/offerDelete/' + offer_id;
  const response = await axios.get(url);
  return response.data.offers;
}
