import React from 'react';
import BreadcrumbsWithIcon from '../components/BreadCrumbs'; 
import { useBreadcrumbs } from '../utils/getBreadcrumbs';

const MsaForm = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="container mx-auto mt-5 font-sans">
      <h1 className="text-xl font-bold">PERMOHONAN PROGRAM</h1>
      <BreadcrumbsWithIcon items={breadcrumbs} />
    </div>
  );
};

export default MsaForm;
