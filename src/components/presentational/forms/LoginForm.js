import React from 'react';
import { Link } from 'react-router-dom';
import useInputState from '../../../hooks/useInputState';

const isEmpty = value => !value && value !== 0 ? { required: true } : null;

export default function LoginForm({ onLogin, submitLabel, useRegisterButton }) {
  const [user, setUser] = useInputState('', [isEmpty]);
  const [password, setPassword] = useInputState('', [isEmpty]);

  const hasErrors = () => !!user.errors.length || !!password.errors.length;
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (hasErrors()) {
      return false;
    }

    onLogin({
      username: user.value,
      password: password.value
    });
  }

  return <form action="#" onSubmit={handleSubmit}>
    <div className="form-column-groups s-mt--6">
      <div className={`form-group ` + (!!user.errors.length && user.changed ? 'form-group--invalid' : '')}>
        <label htmlFor="username" className="form-group__label">Username</label>
        <input id="username" type="text" className="form-group__input" autoComplete="off"
          value={user.value} onBlur={e => !user.changed && setUser(e.target.value)} onChange={e => setUser(e.target.value)} />
        <span className="form-group__error">!</span>
      </div>

      <div className={`form-group ` + (!!password.errors.length && password.changed ? 'form-group--invalid' : '')}>
        <label htmlFor="password" className="form-group__label">Password</label>
        <input id="password" type="password" className="form-group__input"
          value={password.value} onBlur={e => !password.changed && setPassword(e.target.value)} onChange={e => setPassword(e.target.value)} />
        <span className="form-group__error">!</span>
      </div>
    </div>
    
    <div className="align-center s-mt--6">
      <button type="submit" className="btn btn--primary s-mr--2" disabled={hasErrors()}>{submitLabel}</button>
      {useRegisterButton ? <Link to="/register" className="btn btn--default--outline">register</Link> : null}
    </div>
  </form>;
}
