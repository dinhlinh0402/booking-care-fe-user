import React from "react";
import './index.scss';

const Location = ({
  dataLocation
}) => {
  return (
    <div className='container_location'>
      <div dangerouslySetInnerHTML={{ __html: dataLocation }} />
    </div>
  )
}

export default Location;