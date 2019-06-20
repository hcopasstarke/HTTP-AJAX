export const propAscSort = propName => (a, b) => {
    let aProp = a[propName],
      bProp = b[propName];
  
    return aProp || bProp
      ? !aProp ? -1 : !bProp ? 1 : aProp.localeCompare(bProp)
      : 0;
  };

  export const propDescSort = propName => (b, a) => {
    let aProp = a[propName],
      bProp = b[propName];
  
    return aProp || bProp
      ? !aProp ? -1 : !bProp ? 1 : aProp.localeCompare(bProp)
      : 0;
  };
  
  export const inputFilter = (name, age, email) => friend => {
    return (
      friend.name.toLowerCase().includes(name.toLowerCase()) &&
      friend.age.toLowerCase().includes(age.toLowerCase()) &&
      friend.email.toLowerCase().includes(email.toLowerCase()) 
    );
  };