import axios from 'axios';
import Store from '../store';

const API_URL = 'http://localhost:8080/api/admin/';

class AdminService {
    constructor() {
        const {currentUser} = Store.state;
        this.headers = {
            'Content-Type':'application/json',
            'authorization':'Bearer ' + (currentUser ? currentUser.token:'')
        };
    }

    findAllUsers() {
        return axios.get(API_URL + 'all', {headers: this.headers});
    }
}

export default new AdminService();
