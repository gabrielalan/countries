import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return <div className="layout-grid layout-grid--max-width layout-grid--center s-mt--20">
    <div className="layout-grid__item--6">
      <h1>Log into your account</h1>

      <form action="#">
        <div className="form-multiple-groups s-mt--6">
          <div className="form-group">
            <label htmlFor="username" className="form-group--label">Username</label>
            <input id="username" type="text" className="form-group--input" autoComplete="off" />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-group--label">Password</label>
            <input id="password" type="password" className="form-group--input" />
          </div>
        </div>
        
        <div className="align-center s-mt--6">
          <button type="submit" className="btn btn--primary s-mr--2">login</button>
          <Link to="/register" className="btn btn--default--outline">register</Link>
        </div>
      </form>
    </div>
  </div>;
}
