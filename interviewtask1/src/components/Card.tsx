import  { ReactNode } from 'react'

interface props{
  title:string;
  children:ReactNode;
  mt:string;

}


const Card = ({title,mt,children}:props) => {

  const styles = {
    cardContainer: {
      width: "35rem",
      borderRadius: "1.25rem",
      minHeight: "25rem",
      boxShadow: "3px 3px 14px 0px rgba(190, 190, 190, 0.30)",
      marginLeft: "10rem",
      marginTop: mt,
    },
    headerStyles: {
      backgroundColor: "#D0F7FA",
      height: "5.0rem",
      borderRadius: "1.25rem 1.25rem 0 0",
      display: "flex",
      alignItems: "center",
    },
  };
  return (
    <div style={styles.cardContainer}>
      <header style={styles.headerStyles}>
        <h1 style={{marginLeft:"2rem",fontWeight:600,fontSize:"1.5rem"}}>{title}</h1>
      </header>
      <div>{children}</div>
    </div>
  );
}

export default Card