import React from 'react'
import { Link } from 'react-router-dom'

export const Home = (props) => <ul>
  {Object.keys(window.api).map(mode => <li key={mode}><Link to={`/login/${mode}`}>{mode}</Link></li>)}
</ul>