import React, { useRef, useState } from 'react';
import faker from '@faker-js/faker';
import { AutoComplete, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete';
import { useFieldArray, useForm } from 'react-hook-form';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

type User = {
  id: string;
  username: string;
  avatar: string;
};

function createData() {
  return Array.from({ length: faker.datatype.number({ min: 10, max: 1000 }) }).map(() => ({
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    avatar: faker.internet.avatar(),
  }));
}

export default function App() {
  const data = useRef(createData()).current;
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(data);

  const { control, handleSubmit } = useForm<{ users: User[] }>();
  const { fields, append } = useFieldArray({ name: 'users', control });

  function handleCompleteSearch(event: AutoCompleteCompleteMethodParams) {
    setFiltered(data.filter((item) => item.username.includes(event.query)));
  }

  function onSubmit(data: { users: User[] }) {
    console.log(data);
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* @ts-ignore */}
        <AutoComplete
          field="username"
          value={search}
          suggestions={filtered}
          itemTemplate={(user) => user.username}
          completeMethod={handleCompleteSearch}
          onChange={(e) => setSearch(e.value)}
          onSelect={(e) => {
            append(e.value);
            setSearch('');
          }}
        />
        {fields.map((field) => (
          <div key={field.id}>
            <h3>{field.username}</h3>
          </div>
        ))}
      </form>
    </div>
  );
}
