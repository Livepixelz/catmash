import {ReactSVG} from "react-svg";
import { createPortal } from 'react-dom';

const LoadingScreen = () => {
    return(createPortal(<div className="fixed bg-slate-900/20 backdrop-blur inset-0 animate-show">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ReactSVG className="text-white h-40 w-40 flex-1 mx-auto animate-bounce" src="/logo.svg" />
      </div>
    </div>, document.querySelector('#portal')!))
}

export default LoadingScreen
