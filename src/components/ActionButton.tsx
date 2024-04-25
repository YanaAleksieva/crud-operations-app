import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export type ActionButtonProps = {
    onClick: () => Promise<void> | void
    faIcon: IconProp
    children?: ReactNode
}

const ActionButton = ({faIcon, onClick, children} : ActionButtonProps) => {
 return (
    <button onClick={onClick} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2">
        <FontAwesomeIcon className=' size-5' icon={faIcon} size="2xs" />
        {children}
    </button>
 )
};

export default ActionButton;