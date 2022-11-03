import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3333/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getBranchList(){
    return axios.get(API_URL + 'branch', { headers: authHeader() });
  }

  getRolesList(){
    return axios.get(API_URL + 'roles', { headers: authHeader() });
  }

  getUserList(){
    return axios.get(API_URL + 'userlist', { headers: authHeader() });
  }

  deleteUser(userId){
    axios.delete(API_URL + 'userDelete', { headers: authHeader(), data: {id: userId} });
  }

  deleteBranch(branchCode){
    return axios.delete(API_URL + 'branchDelete', { headers: authHeader(), data: {branch_code: branchCode} });
  }

  createBranchs(branchName, fullAdress, branchPhone, branchCode){
    return axios.post(API_URL + 'newBranch', {data: {name: branchName, full_adress: fullAdress, phone: branchPhone, branch_code: branchCode}},{headers: authHeader()});
  }
  
  updateBranchs(branchId, branchName, fullAdress, branchPhone, branchCode){
    return axios.patch(API_URL + 'branchUpdate', {data: {id: branchId, name: branchName, full_adress: fullAdress, phone: branchPhone, branch_code: branchCode}},{headers: authHeader()});
  }



  

}

export default new UserService();