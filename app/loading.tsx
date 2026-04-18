import { Vortex } from "react-loader-spinner";

export default function Loader() {
   return (
      <div>
         <Vortex
            visible={true}
            height="65"
            width="65"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
         />
      </div>
   );
}
