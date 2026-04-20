import { Vortex } from 'react-loader-spinner';
import css from './loading.module.css';
export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <Vortex
        visible={true}
        height="65"
        width="65"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </div>
  );
}
