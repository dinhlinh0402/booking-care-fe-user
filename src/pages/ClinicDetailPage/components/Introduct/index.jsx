import React from "react";
import './index.scss';
const Introduct = ({
  dataIntroduct
}) => {
  return (
    <div className='container_introduce'>
      <div dangerouslySetInnerHTML={{ __html: dataIntroduct }} />
    </div>
  )
}

export default Introduct;