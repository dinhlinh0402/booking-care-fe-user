import React from "react";
import './index.scss';

const Strengths = ({
  dataStrengths
}) => {
  return (
    <div className='container_strengths'>
      <div dangerouslySetInnerHTML={{ __html: dataStrengths }} />
    </div>
  )
}

export default Strengths;