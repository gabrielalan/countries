import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm({ onLogin }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ user, password });
  }

  return <form action="#" onSubmit={handleSubmit}>
    <div className="form-multiple-groups s-mt--6">
      <div className="form-group">
        <label htmlFor="username" className="form-group--label">Username</label>
        <input id="username" type="text" className="form-group--input" autoComplete="off" value={user} onChange={e => setUser(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-group--label">Password</label>
        <input id="password" type="password" className="form-group--input" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
    </div>
    
    <div className="align-center s-mt--6">
      <button type="submit" className="btn btn--primary s-mr--2">login</button>
      <Link to="/register" className="btn btn--default--outline">register</Link>
    </div>
  </form>;
}
