import  { FC , useState } from 'react'


const tabItems: string[] = [
  "Program Details",
  "Application Form",
  "Workflow",
  "Preview",
];
const styles = {
  tabOuterContainer: {
    width: "100%",
    height: "100%",
    boxShadow: "",
    backgroundColor: "blue",
  },
  tabContentContainer: {
    display: "flex",
    width: "100%",
  },
};

const HorizontalTab:FC = () => {

  const [activeTab,setActiveTab] = useState<number>(1)
  return (
    <div style={styles.tabContentContainer}>
      <div style={styles.tabContentContainer}>
        {tabItems.map((item: string, i: number) => (
          <div
          key={i}
            style={{
              padding: "2rem",
              textAlign: "center",
              width: "22.5%",
              fontSize: "1.25rem",
              fontFamily: "inter",
              fontWeight: 500,
              backgroundColor: activeTab ===i? "#00635B" :"",
              color:activeTab ===i?"white":"",
              transition:"0.3s all"
            }}
            onClick={()=>setActiveTab(i)}
          >
            {item}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalTab