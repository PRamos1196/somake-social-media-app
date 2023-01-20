import jwtDecode from 'jwt-decode';
import axios from 'axios';



export const createOrGetUser = async (response: any, addUser: any) => {
    const decoded : { name: string, picture: string, sub: string} = jwtDecode(response.credential);

    const { name, picture, sub } = decoded;

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
    }

    addUser(user);
    await axios.post(`http://localhost:3000/api/auth`, user);
};
