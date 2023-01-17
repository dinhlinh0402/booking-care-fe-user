import React from "react";
import './index.scss';

const Equipment = ({
  dataEquipment
}) => {
  return (
    <div className='container_equipment'>
      <div dangerouslySetInnerHTML={{ __html: dataEquipment }} />
    </div>
  )
}

export default Equipment;