import  { FC ,CSSProperties} from 'react'
import { MenuOutlined ,HomeOutlined } from '@ant-design/icons';
import Image from 'components/Image';
import clipBoard from "src/assets/clipBoard.svg"

export const SideBarWrapper:FC = () => {



  const styles = {
    sideBarContainer: {
      height: "140%",
      width: "60px",
      backgroundColor: "white",
      transition: "0.5s all ",
      boxShadow: " -8px 1px 8px 3px #000000",
      zIndex:500
    },
    iconsContainer:{
      display:"flex",
      flexDirection:"column",
      alignItems:"center ",
      gap:"3rem"
    }
  };
  return (
   
      <div className="side-bar-continer" style={styles.sideBarContainer}>
        <div style={styles.iconsContainer as CSSProperties}>
          <MenuOutlined style={{ fontSize: "1.7rem", marginTop: "3.5rem" }} />
          <HomeOutlined style={{ fontSize: "1.7rem" }} />
          <Image src={clipBoard} />
        </div>
      </div>
  );
}



