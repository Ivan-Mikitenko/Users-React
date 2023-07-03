import React, {useEffect, useState} from 'react';
import './index.scss';
import { Users } from './components/Users';
import axios from "axios";
import {Success} from "./components/Success";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([])
  const [invites, setInvites] = useState([])
  const [success, setSuccess] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = React.useState('');

  useEffect(() => {
    axios.get('https://reqres.in/api/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(err => {
        console.warn(err);
        alert(`Ошибка загрузки пользователей. Ошибка: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // рендерим один раз

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  }

  const onClickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites(prev => prev.filter((_id) => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }

    console.log(invites)
  }

  const onClickSendInvites = () => {
    setSuccess(true)
  }

  return (
    <div className="App">
      {success ? (
          <Success count={invites.length}/>
        ) : (
          <Users
            onClickSendInvites={onClickSendInvites}
            onChangeSearchValue={onChangeSearchValue}
            searchValue={searchValue}
            items={users}
            isLoading={isLoading}
            onClickInvate={onClickInvite}
            invites={invites}
          />
        )
      }
    </div>
  );
}

export default App;
