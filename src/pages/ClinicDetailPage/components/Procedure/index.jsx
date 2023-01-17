import React from "react";
import './index.scss';

const Procedure = ({
  dataProcedure
}) => {
  return (
    <div className='container_procedure'>
      <div dangerouslySetInnerHTML={{ __html: dataProcedure }} />
    </div>
  )
}

export default Procedure;