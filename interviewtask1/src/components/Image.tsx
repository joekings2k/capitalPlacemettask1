

interface ImageProps {
  src: string;
  width?: string;
  height?: string;
}

const Image = ({src , width,height}:ImageProps) => {
  return (
    <div>
      <img src={src} style={{width:width ,height:height}}  />
    </div>
  )
}

export default Image