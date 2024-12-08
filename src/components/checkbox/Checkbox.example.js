import { useState } from 'react';
import Checkbox from './Checkbox';

const CheckboxExample = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Checkbox
      label="Marque-me"
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};

export default CheckboxExample;