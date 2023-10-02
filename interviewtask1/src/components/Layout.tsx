import  { ReactNode } from 'react'
import { SideBarWrapper } from 'components/SideBarWrapper';
import HorizontalTab from './HorizontalTab';
interface props {
  children:ReactNode
}

export const Layout = ({children}:props) => {
  return (
    <div style={{ height: "100%", display: "flex" }}>
      <SideBarWrapper />
      <div style={{display:"flex" ,flexDirection:"column", width:"100%"}}>
        <div
          style={{
            width: "100%",
            marginTop: "5rem",
            boxShadow: " 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
            height: "",
          }}
        >
          <HorizontalTab />
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
