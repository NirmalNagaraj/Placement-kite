import React from 'react';
import { Link } from 'react-router-dom';

import UploadPDF from './UploadPDF';

export default function Home() {
  return (
    <>
    <Link to="/report">
      <div>Home</div>
    </Link>
    <Link to="/login">
      <div>Login</div>
    </Link>
    
    <UploadPDF/>
    </>
  );
}